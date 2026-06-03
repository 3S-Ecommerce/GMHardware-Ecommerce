import {
  afterNextRender,
  Component,
  computed,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { Order, CheckoutPayload } from '../../../../core/services/order';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Cart } from '../../../../core/services/cart';
import { CheckoutService } from '../../../../core/services/checkout.service';
import {
  EnderecoService,
  Endereco,
  EnderecoPayload
} from '../../../../core/services/endereco';

@Component({
  selector: 'app-revisar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './revisar.html',
  styleUrl: './revisar.scss',
})
export class Revisar {
  private orderService = inject(Order);
  private cart = inject(Cart);
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private enderecoService = inject(EnderecoService);
  private platformId = inject(PLATFORM_ID);

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

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.cart.iniciar();
      this.carregarUsuarioLogado();
      this.carregarEnderecos();
      this.carregarCartaoSelecionado();
    });
  }

  produtos = computed(() => {
    return this.cart.items();
  });

  valorTotal = computed(() => {
    return this.cart.valorTotal();
  });

  metodoPagamento = computed(() => {
    return this.checkoutService.getPaymentMethodName();
  });

  private getLocalStorageItem(chave: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem(chave);
  }

  private limparSessao(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  carregarUsuarioLogado(): void {
    const usuarioStr = this.getLocalStorageItem('user');

    if (!usuarioStr) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioLogado = JSON.parse(usuarioStr);
  }

  carregarCartaoSelecionado(): void {
    const cartaoStr = this.getLocalStorageItem('cartaoSelecionado');

    if (cartaoStr) {
      this.cartaoSelecionado = JSON.parse(cartaoStr);
    }
  }

  carregarEnderecos(): void {
    const enderecoSelecionadoStr = this.getLocalStorageItem('enderecoSelecionado');

    if (enderecoSelecionadoStr) {
      this.enderecoSelecionado = JSON.parse(enderecoSelecionadoStr);
    }

    this.enderecoService.listar().subscribe({
      next: (res) => {
        this.enderecos = res;

        if (this.enderecoSelecionado) {
          return;
        }

        const enderecoPadrao = this.enderecos.find(e => e.padrao);

        this.enderecoSelecionado = enderecoPadrao || this.enderecos[0] || null;
      },
      error: (err) => {
        console.error(err);

        if (err.status === 401) {
          this.limparSessao();
          this.router.navigate(['/login']);
          return;
        }
      }
    });
  }

  formatarEndereco(endereco: Endereco): string {
    return `${endereco.street}, ${endereco.number} - ${endereco.city} - CEP ${endereco.zip_code}`;
  }

  formatarNumeroCartao(numero: string): string {
    if (!numero) return '';

    return '**** **** **** ' + numero.slice(-4);
  }

  detalhePagamento(): string {
    const metodo = this.metodoPagamento();

    if (metodo === 'Cartão de Crédito' && this.cartaoSelecionado) {
      return `${metodo} - final ${this.cartaoSelecionado.numero_cartao.slice(-4)}`;
    }

    return metodo;
  }

  abrirEscolhaEndereco(): void {
    this.mostrarEscolhaEndereco = !this.mostrarEscolhaEndereco;

    if (this.mostrarEscolhaEndereco) {
      this.carregarEnderecos();
    }
  }

  selecionarEndereco(endereco: Endereco): void {
    this.enderecoSelecionado = endereco;
    this.mostrarEscolhaEndereco = false;
    this.mostrarFormularioEndereco = false;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        'enderecoSelecionado',
        JSON.stringify(endereco)
      );
    }
  }

  definirEnderecoPadrao(id: number): void {
    this.enderecoService.definirPadrao(id).subscribe({
      next: () => {
        this.enderecos.forEach(endereco => {
          endereco.padrao = endereco.id === id ? 1 : 0;
        });

        const novoPadrao = this.enderecos.find(endereco => endereco.id === id);

        if (novoPadrao) {
          this.enderecoSelecionado = novoPadrao;

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(
              'enderecoSelecionado',
              JSON.stringify(novoPadrao)
            );
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

  abrirFormularioNovoEndereco(): void {
    this.mostrarFormularioEndereco = true;

    this.novoEndereco = {
      zip_code: '',
      street: '',
      number: '',
      city: ''
    };
  }

  cancelarNovoEndereco(): void {
    this.mostrarFormularioEndereco = false;

    this.novoEndereco = {
      zip_code: '',
      street: '',
      number: '',
      city: ''
    };
  }

  salvarNovoEnderecoNaRevisao(): void {
    if (!this.formularioEnderecoValido()) {
      alert('Preencha CEP, Rua, Número e Cidade.');
      return;
    }

    this.enderecoService.salvar(this.novoEndereco).subscribe({
      next: (res) => {
        this.enderecoSelecionado = res;
        this.mostrarFormularioEndereco = false;

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(
            'enderecoSelecionado',
            JSON.stringify(res)
          );
        }

        this.novoEndereco = {
          zip_code: '',
          street: '',
          number: '',
          city: ''
        };

        this.carregarEnderecos();

        alert('Endereço cadastrado com sucesso!');
      },
      error: (err) => {
        console.error(err);

        if (err.status === 401) {
          this.limparSessao();
          this.router.navigate(['/login']);
          return;
        }

        alert('Erro ao cadastrar endereço.');
      }
    });
  }

  private formularioEnderecoValido(): boolean {
    return (
      this.novoEndereco.zip_code.trim().length > 0 &&
      this.novoEndereco.street.trim().length > 0 &&
      this.novoEndereco.number.trim().length > 0 &&
      this.novoEndereco.city.trim().length > 0
    );
  }

  confirmarPedido(): void {
  if (!this.enderecoSelecionado) {
    alert('Selecione um endereço antes de finalizar a compra.');
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

  const items = this.produtos().map((produto: any) => {
    return {
      id_product: Number(produto.id),
      quantity: Number(produto.quantity),
      price: Number(produto.price || produto.preco || produto.valor || 0)
    };
  });

  const payload: CheckoutPayload = {
    endereco_id: this.enderecoSelecionado.id,
    payment_method: this.metodoPagamento(),
    card_id: this.cartaoSelecionado ? this.cartaoSelecionado.id : null,
    total_price: Number(this.valorTotal()),
    items: items
  };

  this.orderService.checkout(payload).subscribe({
    next: (res) => {
      this.cart.limparCarrinho();

      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('enderecoSelecionado');
        localStorage.removeItem('cartaoSelecionado');
        localStorage.removeItem('metodoPagamento');
      }

      alert(res?.message || 'Compra realizada com sucesso! Os dados foram salvos em Minhas Compras.');

      this.router.navigate(['/inicio']);
    },
    error: (err) => {
      console.error(err);

      const mensagem = err?.error?.message || err?.error?.error || 'Erro ao finalizar compra.';

      alert(mensagem);
    }
  });
}

  menosProduto(itemId: number): void {
    if (this.cart.removerCarrinho(Number(itemId))) {
      alert('Item removido do carrinho!');
    } else {
      alert('Erro ao remover item do carrinho!');
    }
  }

  maisProduto(itemId: number): void {
    if (this.cart.somarProduto(itemId)) {
      alert('Item aumentado do carrinho!');
    } else {
      alert('Erro ao aumentar item do carrinho!');
    }
  }
}