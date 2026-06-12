import { afterNextRender, Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Order, CheckoutPayload } from '../../../../core/services/order';
import { Cart } from '../../../../core/services/cart';
import { CheckoutService } from '../../../../core/services/checkout.service';
import { EnderecoService, Endereco, EnderecoPayload } from '../../../../core/services/endereco';
import { FreteService, FreteOpcao } from '../../../../core/services/frete';

@Component({
  selector: 'app-revisar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgOptimizedImage],
  templateUrl: './revisar.html',
  styleUrl: './revisar.scss'
})
export class Revisar implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private orderService = inject(Order);
  private cart = inject(Cart);
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private enderecoService = inject(EnderecoService);
  private freteService = inject(FreteService);
  private platformId = inject(PLATFORM_ID);

  carregandoItens = signal<boolean>(true);
  confirmandoPedido = signal<boolean>(false);

  produtos = signal<any[]>([]);
  comId = signal<boolean>(false);

  usuarioLogado: any = null;

  enderecos: Endereco[] = [];
  enderecoSelecionado: Endereco | null = null;

  cartaoSelecionado: any = null;

  mostrarEscolhaEndereco = false;
  mostrarFormularioEndereco = false;

  novoEndereco: EnderecoPayload = {
    zip_code: '',
    street: '',
    number: '',
    city: ''
  };

  opcoesFrete: FreteOpcao[] = [];
  freteSelecionado: FreteOpcao | null = null;
  carregandoFrete = signal<boolean>(false);
  erroFrete = '';

  constructor() {
    afterNextRender(() => { });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cart.iniciar();
      this.carregarUsuarioLogado();
      this.carregarCartaoSelecionado();
      this.carregarEnderecos();
      this.inicializarProdutos();
    }
  }

  valorTotal = computed(() => {
    return this.produtos().reduce((total, produto) => {
      const preco = Number(produto.price ?? produto.preco ?? produto.valor ?? 0);
      const quantidade = Number(produto.quantity ?? 1);

      return total + (preco * quantidade);
    }, 0);
  });

  metodoPagamento = computed(() => {
    return this.checkoutService.getPaymentMethodName();
  });

  inicializarProdutos() {
    const urlProdutoId = this.route.snapshot.queryParamMap.get('produto_id');
    const urlQuantidade = this.route.snapshot.queryParamMap.get('quantidade');

    if (urlProdutoId) {
      const idBuscado = Number(urlProdutoId);
      const quantidadeBuscada = Number(urlQuantidade) || 1;

      this.http.get<any>(`https://gmhardware-ecommerce.onrender.com/api/product/${idBuscado}`).subscribe({
        next: (produtoDoBanco) => {
          const imagem = produtoDoBanco.image
            ? `https://pub-38889ba16be84990a69dfca8fd011b2c.r2.dev/${produtoDoBanco.image}`
            : 'assets/images/placeholder.png';
          if (this.metodoPagamento() == 'PIX') {
            this.produtos.set([{
              id: produtoDoBanco.id,
              name: produtoDoBanco.name,
              price: Number(produtoDoBanco.price ?? produtoDoBanco.preco ?? 0) * .9,
              image: imagem,
              quantity: quantidadeBuscada,
              width: Number(produtoDoBanco.width ?? 20),
              height: Number(produtoDoBanco.height ?? 10),
              length: Number(produtoDoBanco.length ?? 30),
              weight: Number(produtoDoBanco.weight ?? 1)
            }]);
          } else {
            this.produtos.set([{
              id: produtoDoBanco.id,
              name: produtoDoBanco.name,
              price: Number(produtoDoBanco.price ?? produtoDoBanco.preco ?? 0),
              image: imagem,
              quantity: quantidadeBuscada,
              width: Number(produtoDoBanco.width ?? 20),
              height: Number(produtoDoBanco.height ?? 10),
              length: Number(produtoDoBanco.length ?? 30),
              weight: Number(produtoDoBanco.weight ?? 1)
            }]);
          }
          this.carregandoItens.set(false);
          this.comId.set(true);
          this.tentarCalcularFrete();
        },
        error: (err) => {
          console.error('Erro ao buscar produto para finalização:', err);
          alert('Não foi possível carregar os dados do produto para a finalização.');
          this.carregandoItens.set(false);
        }
      });

      return;
    }

    const produtosCarrinho = this.cart.items().map(produto => ({
      ...produto,
      width: Number((produto as any).width ?? 20),
      height: Number((produto as any).height ?? 10),
      length: Number((produto as any).length ?? 30),
      weight: Number((produto as any).weight ?? 1)
    }));

    this.produtos.set(produtosCarrinho);
    this.carregandoItens.set(false);
    this.tentarCalcularFrete();
  }

  private getLocalStorageItem(chave: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem(chave);
  }

  private limparSessao() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('enderecoSelecionado');
    localStorage.removeItem('cartaoSelecionado');
    localStorage.removeItem('freteSelecionado');
    localStorage.removeItem('metodoPagamento');
  }

  carregarUsuarioLogado() {
    const usuarioStr = this.getLocalStorageItem('user');

    if (!usuarioStr) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.usuarioLogado = JSON.parse(usuarioStr);
    } catch (error) {
      console.error('Erro ao interpretar usuário salvo:', error);
      this.limparSessao();
      this.router.navigate(['/login']);
    }
  }

  carregarCartaoSelecionado() {
    const cartaoStr = this.getLocalStorageItem('cartaoSelecionado');

    if (!cartaoStr) {
      this.cartaoSelecionado = null;
      return;
    }

    try {
      this.cartaoSelecionado = JSON.parse(cartaoStr);
    } catch (error) {
      console.error('Erro ao carregar cartão selecionado:', error);
      this.cartaoSelecionado = null;
    }
  }

  carregarEnderecos() {
    const enderecoSelecionadoStr = this.getLocalStorageItem('enderecoSelecionado');

    if (enderecoSelecionadoStr) {
      try {
        this.enderecoSelecionado = JSON.parse(enderecoSelecionadoStr);
      } catch (error) {
        console.error('Erro ao carregar endereço selecionado:', error);
        this.enderecoSelecionado = null;
      }
    }

    this.enderecoService.listar().subscribe({
      next: (res) => {
        this.enderecos = Array.isArray(res) ? res : [];

        if (!this.enderecoSelecionado) {
          const enderecoPadrao = this.enderecos.find(endereco => endereco.padrao === true || endereco.padrao === 1);
          this.enderecoSelecionado = enderecoPadrao || this.enderecos[0] || null;
        } else {
          const enderecoAtualizado = this.enderecos.find(endereco => endereco.id === this.enderecoSelecionado?.id);

          if (enderecoAtualizado) {
            this.enderecoSelecionado = enderecoAtualizado;
          } else {
            const enderecoPadrao = this.enderecos.find(endereco => endereco.padrao === true || endereco.padrao === 1);
            this.enderecoSelecionado = enderecoPadrao || this.enderecos[0] || null;
          }
        }

        if (this.enderecoSelecionado && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('enderecoSelecionado', JSON.stringify(this.enderecoSelecionado));
        }

        this.tentarCalcularFrete();
      },
      error: (err) => {
        console.error('Erro ao carregar endereços:', err);

        if (err.status === 401) {
          this.limparSessao();
          this.router.navigate(['/login']);
          return;
        }

        this.erroFrete = 'Não foi possível carregar o endereço para calcular o frete.';
      }
    });
  }

  formatarEndereco(endereco: Endereco): string {
    return `${endereco.street}, ${endereco.number} - ${endereco.city} - CEP ${endereco.zip_code}`;
  }

  formatarNumeroCartao(numero: string): string {
    if (!numero) {
      return '';
    }

    return `**** **** **** ${numero.slice(-4)}`;
  }

  detalhePagamento(): string {
    const metodo = this.metodoPagamento();

    if (metodo === 'Cartão de Crédito' && this.cartaoSelecionado) {
      const finalCartao = this.cartaoSelecionado.numero_cartao?.slice(-4) || '';

      return `${metodo} - final ${finalCartao}`;
    }

    return metodo;
  }

  abrirEscolhaEndereco() {
    this.mostrarEscolhaEndereco = !this.mostrarEscolhaEndereco;

    if (this.mostrarEscolhaEndereco) {
      this.carregarEnderecos();
    }
  }

  selecionarEndereco(endereco: Endereco) {
    const enderecoMudou = this.enderecoSelecionado?.id !== endereco.id;

    this.enderecoSelecionado = endereco;
    this.mostrarEscolhaEndereco = false;
    this.mostrarFormularioEndereco = false;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('enderecoSelecionado', JSON.stringify(endereco));
    }

    if (enderecoMudou) {
      this.limparFrete();
      this.calcularFrete();
    }
  }

  definirEnderecoPadrao(id: number) {
    this.enderecoService.definirPadrao(id).subscribe({
      next: () => {
        this.enderecos.forEach(endereco => {
          endereco.padrao = endereco.id === id ? 1 : 0;
        });

        const novoPadrao = this.enderecos.find(endereco => endereco.id === id);

        if (novoPadrao) {
          const enderecoMudou = this.enderecoSelecionado?.id !== novoPadrao.id;

          this.enderecoSelecionado = novoPadrao;

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('enderecoSelecionado', JSON.stringify(novoPadrao));
          }

          if (enderecoMudou) {
            this.limparFrete();
            this.calcularFrete();
          }
        }

        alert('Endereço definido como padrão!');
      },
      error: (err) => {
        console.error(err);

        if (err.status === 401) {
          this.limparSessao();
          this.router.navigate(['/login']);
          return;
        }

        alert('Erro ao definir endereço padrão.');
      }
    });
  }

  abrirFormularioNovoEndereco() {
    this.mostrarFormularioEndereco = true;

    this.novoEndereco = {
      zip_code: '',
      street: '',
      number: '',
      city: ''
    };
  }

  cancelarNovoEndereco() {
    this.mostrarFormularioEndereco = false;

    this.novoEndereco = {
      zip_code: '',
      street: '',
      number: '',
      city: ''
    };
  }

  salvarNovoEnderecoNaRevisao() {
    if (!this.formularioEnderecoValido()) {
      alert('Preencha CEP, Rua, Número e Cidade.');
      return;
    }

    const payload: EnderecoPayload = {
      zip_code: this.novoEndereco.zip_code.replace(/\D/g, ''),
      street: this.novoEndereco.street.trim(),
      number: this.novoEndereco.number.trim(),
      city: this.novoEndereco.city.trim()
    };

    this.enderecoService.salvar(payload).subscribe({
      next: (res) => {
        this.enderecoSelecionado = res;
        this.mostrarFormularioEndereco = false;
        this.mostrarEscolhaEndereco = false;

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('enderecoSelecionado', JSON.stringify(res));
        }

        this.novoEndereco = {
          zip_code: '',
          street: '',
          number: '',
          city: ''
        };

        this.enderecos = [
          ...this.enderecos.filter(endereco => endereco.id !== res.id),
          res
        ];

        this.limparFrete();
        this.calcularFrete();

        alert('Endereço cadastrado com sucesso!');
      },
      error: (err) => {
        console.error(err);

        if (err.status === 401) {
          this.limparSessao();
          this.router.navigate(['/login']);
          return;
        }

        const mensagem = err?.error?.message || err?.error?.error || 'Erro ao cadastrar endereço.';

        alert(mensagem);
      }
    });
  }

  private formularioEnderecoValido(): boolean {
    const cep = this.novoEndereco.zip_code.replace(/\D/g, '');

    return (
      cep.length === 8 &&
      this.novoEndereco.street.trim().length > 0 &&
      this.novoEndereco.number.trim().length > 0 &&
      this.novoEndereco.city.trim().length > 0
    );
  }

  private tentarCalcularFrete() {
    if (
      !this.enderecoSelecionado ||
      this.produtos().length === 0 ||
      this.carregandoFrete() ||
      this.opcoesFrete.length > 0 ||
      this.freteSelecionado
    ) {
      return;
    }

    this.calcularFrete();
  }

  calcularFrete() {
    if (!this.enderecoSelecionado) {
      this.erroFrete = 'Selecione um endereço para calcular o frete.';
      return;
    }

    const cepDestino = String(this.enderecoSelecionado.zip_code || '').replace(/\D/g, '');

    if (cepDestino.length !== 8) {
      this.erroFrete = 'O endereço selecionado não possui um CEP válido.';
      return;
    }

    if (this.produtos().length === 0) {
      this.erroFrete = 'Não existem produtos para calcular o frete.';
      return;
    }

    const items = this.produtos().map((produto: any) => ({
      id: Number(produto.id),
      quantity: Number(produto.quantity ?? 1),
      price: Number(produto.price ?? produto.preco ?? produto.valor ?? 0),
      width: Number(produto.width ?? 20),
      height: Number(produto.height ?? 10),
      length: Number(produto.length ?? 30),
      weight: Number(produto.weight ?? 1)
    }));

    this.carregandoFrete.set(true);
    this.erroFrete = '';
    this.opcoesFrete = [];
    this.freteSelecionado = null;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('freteSelecionado');
    }

    this.freteService.calcularFrete({
      cep_destino: cepDestino,
      items
    }).subscribe({
      next: (res) => {
        const resposta = Array.isArray(res) ? res : [];

        this.opcoesFrete = resposta.filter((frete: FreteOpcao) => {
          return !frete.error && frete.price !== null && frete.price !== undefined;
        });

        this.carregandoFrete.set(false);

        if (this.opcoesFrete.length === 0) {
          this.erroFrete = 'Nenhuma opção de frete foi encontrada para esse CEP.';
        }
      },
      error: (err) => {
        console.error('Erro ao calcular frete:', err);

        this.carregandoFrete.set(false);
        this.opcoesFrete = [];
        this.freteSelecionado = null;

        if (err.status === 401) {
          this.erroFrete = 'Sua sessão expirou. Faça login novamente.';
          return;
        }

        this.erroFrete =
          err?.error?.error ||
          err?.error?.message ||
          err?.error?.details?.message ||
          err?.error?.detalhes?.message ||
          'Não foi possível calcular o frete.';
      }
    });
  }

  selecionarFrete(frete: FreteOpcao) {
    if (frete.error) {
      return;
    }

    this.freteSelecionado = frete;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('freteSelecionado', JSON.stringify(frete));
    }
  }

  private limparFrete() {
    this.opcoesFrete = [];
    this.freteSelecionado = null;
    this.erroFrete = '';
    this.carregandoFrete.set(false);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('freteSelecionado');
    }
  }

  valorFrete(): number {
    const preco = this.freteSelecionado?.custom_price ?? this.freteSelecionado?.price ?? 0;

    return Number(preco);
  }

  valorTotalComFrete(): number {
    return Number(this.valorTotal()) + this.valorFrete();
  }

  confirmarPedido() {
    if (!this.enderecoSelecionado) {
      alert('Selecione um endereço antes de finalizar a compra.');
      return;
    }

    if (!this.freteSelecionado) {
      alert('Selecione uma opção de frete antes de finalizar a compra.');
      return;
    }

    if (this.metodoPagamento() === 'Não selecionado') {
      alert('Selecione uma forma de pagamento antes de finalizar a compra.');
      return;
    }

    if (this.metodoPagamento() === 'Cartão de Crédito' && !this.cartaoSelecionado) {
      alert('Selecione um cartão antes de finalizar a compra.');
      return;
    }

    if (this.produtos().length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    this.confirmandoPedido.set(true);

    const items = this.produtos().map((produto: any) => ({
      id_product: Number(produto.id),
      quantity: Number(produto.quantity ?? 1),
      price: Number(produto.price ?? produto.preco ?? produto.valor ?? 0)
    }));

    const payload: CheckoutPayload = {
      endereco_id: this.enderecoSelecionado.id,
      payment_method: this.metodoPagamento(),
      card_id: this.cartaoSelecionado ? this.cartaoSelecionado.id : null,
      total_price: Number(this.valorTotalComFrete()),
      items,
      shipping_service: this.freteSelecionado.name || null,
      shipping_company: this.freteSelecionado.company?.name || null,
      shipping_price: Number(this.freteSelecionado.custom_price ?? this.freteSelecionado.price ?? 0),
      shipping_delivery_time: Number(this.freteSelecionado.custom_delivery_time ?? this.freteSelecionado.delivery_time ?? 0)
    };

    this.orderService.checkout(payload).subscribe({
      next: (res) => {
        this.cart.limparCarrinho();

        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('enderecoSelecionado');
          localStorage.removeItem('cartaoSelecionado');
          localStorage.removeItem('metodoPagamento');
          localStorage.removeItem('freteSelecionado');
        }

        alert(res?.message || 'Compra realizada com sucesso! Os dados foram salvos em Minhas Compras.');

        if (payload.payment_method.toLowerCase().includes('pix')) {
          const orderId = res?.order?.id || res?.id || 0;

          this.confirmandoPedido.set(false);

          this.router.navigate(['/finalizar-compra/pagamento/pix'], {
            queryParams: {
              id_order: orderId,
              total: payload.total_price
            }
          });

          return;
        }

        this.confirmandoPedido.set(false);
        this.router.navigate(['/concluido']);
      },
      error: (err) => {
        console.error('Erro ao finalizar compra:', err);

        this.confirmandoPedido.set(false);

        const mensagem = err?.error?.message || err?.error?.error || 'Erro ao finalizar compra.';

        alert(mensagem);
      }
    });
  }

  menosProduto(itemId: number) {
    const urlProdutoId = this.route.snapshot.queryParamMap.get('produto_id');

    if (urlProdutoId) {
      alert('Para itens de compra direta, altere a quantidade na página do produto.');
      return;
    }

    if (this.cart.removerCarrinho(Number(itemId))) {
      const produtosAtualizados = this.cart.items().map(produto => ({
        ...produto,
        width: Number((produto as any).width ?? 20),
        height: Number((produto as any).height ?? 10),
        length: Number((produto as any).length ?? 30),
        weight: Number((produto as any).weight ?? 1)
      }));

      this.produtos.set(produtosAtualizados);
      this.limparFrete();
      this.tentarCalcularFrete();
    }
  }

  maisProduto(itemId: number) {
    const urlProdutoId = this.route.snapshot.queryParamMap.get('produto_id');

    if (urlProdutoId) {
      alert('Para itens de compra direta, altere a quantidade na página do produto.');
      return;
    }

    if (this.cart.somarProduto(itemId)) {
      const produtosAtualizados = this.cart.items().map(produto => ({
        ...produto,
        width: Number((produto as any).width ?? 20),
        height: Number((produto as any).height ?? 10),
        length: Number((produto as any).length ?? 30),
        weight: Number((produto as any).weight ?? 1)
      }));

      this.produtos.set(produtosAtualizados);
      this.limparFrete();
      this.tentarCalcularFrete();
    }
  }
}