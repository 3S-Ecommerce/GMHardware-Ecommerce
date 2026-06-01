import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../../core/services/cart';
import { EnderecoService } from '../../../core/services/endereco';
// Importe Cartao e CartaoPayload para tipagem correta
import { CartaoService, Cartao, CartaoPayload } from '../../../core/services/cartao'; 
import { ComprasService } from '../../../core/services/compras';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class CheckoutComponent implements OnInit {
  carrinho: any[] = [];
  enderecos: any[] = [];
  cartoes: Cartao[] = []; // Tipagem corrigida para Cartao[]
  
  etapa: string = 'endereco';
  enderecoSelecionado: any = null;
  cartaoSelecionado: Cartao | null = null; // Tipagem corrigida para Cartao ou null
  
  mostrarFormEndereco = false;
  mostrarFormCartao = false;
  
  novoEndereco = {
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zip_code: '',
    type: 'Residencial',
    contact_name: '',
    contact_phone: ''
  };
  
  novoCartao: CartaoPayload = { // Tipagem corrigida para CartaoPayload
    nome_titular: '',
    numero_cartao: '',
    vencimento: '',
    cvv: '',
    cpf: ''
  };
  
  carregando = false;
  total = 0;
  
  constructor(
    private cartService: CartService,
    private enderecoService: EnderecoService,
    private cartaoService: CartaoService,
    private comprasService: ComprasService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.carregarCarrinho();
    this.carregarEnderecos();
    this.carregarCartoes();
  }
  
  carregarCarrinho() {
    this.carrinho = this.cartService.obterCarrinho();
    this.calcularTotal();
  }
  
  carregarEnderecos() {
    this.enderecoService.listar().subscribe({
      next: (res) => this.enderecos = res
    });
  }
  
  carregarCartoes() {
    // Usando o método listar que padronizamos na CartaoService
    this.cartaoService.listar().subscribe({
      next: (res) => this.cartoes = res
    });
  }
  
  calcularTotal() {
    this.total = this.carrinho.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  
  selecionarEndereco(endereco: any) {
    this.enderecoSelecionado = endereco;
    this.etapa = 'cartao';
  }
  
  selecionarCartao(cartao: Cartao) { // Tipagem corrigida para Cartao
    this.cartaoSelecionado = cartao;
    this.etapa = 'confirmacao';
  }
  
  excluirEndereco(id: number, event: Event) {
    event.stopPropagation(); 
    if (confirm('Deseja excluir este endereço?')) {
      this.enderecoService.excluir(id).subscribe({
        next: () => this.carregarEnderecos()
      });
    }
  }
  
  excluirCartao(id: number, event: Event) {
    event.stopPropagation(); 
    if (confirm('Deseja excluir este cartão?')) {
      // Método de exclusão corrigido para excluirCartao
      this.cartaoService.excluirCartao(id).subscribe({
        next: () => this.carregarCartoes()
      });
    }
  }
  
  adicionarNovoEndereco() {
    this.mostrarFormEndereco = !this.mostrarFormEndereco;
  }
  
  salvarNovoEndereco() {
    this.enderecoService.salvar(this.novoEndereco).subscribe({
      next: (res) => {
        this.enderecos.push(res);
        this.mostrarFormEndereco = false;
        this.selecionarEndereco(res);
      }
    });
  }
  
  adicionarNovoCartao() {
    this.mostrarFormCartao = !this.mostrarFormCartao;
  }
  
  salvarNovoCartao() {
    this.cartaoService.salvarCartao(this.novoCartao).subscribe({
      next: (res) => {
        this.cartoes.push(res);
        this.mostrarFormCartao = false;
        this.selecionarCartao(res);
      }
    });
  }
  
  finalizarCompra() {
    if (!this.enderecoSelecionado || !this.cartaoSelecionado) {
      alert('Selecione um endereço e um método de pagamento');
      return;
    }
    
    this.carregando = true;
    
    const dadosPedido = {
      total_price: this.total,
      items: this.carrinho.map(item => ({
        id_product: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };
    
    this.comprasService.finalizarCheckout(dadosPedido).subscribe({
      next: () => {
        alert('Compra realizada com sucesso!');
        this.cartService.limparCarrinho();
        this.router.navigate(['/compras']);
      },
      error: (err) => {
        alert('Erro ao processar o pedido. Tente novamente.');
        this.carregando = false;
      }
    });
  }
}
