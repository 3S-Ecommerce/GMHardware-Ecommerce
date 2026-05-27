import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartaoService, Cartao, CartaoPayload } from '../../../../core/services/cartao'; 

@Component({
  selector: 'app-meus-cartoes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meus-cartoes.html',
  styleUrls: ['./meus-cartoes.scss']
})
export class MeusCartoesComponent implements OnInit {
  cartoes: Cartao[] = [];
  mostrarFormulario: boolean = false;
  carregando: boolean = false;
  erro: string = '';

  novoCartao: CartaoPayload = {
    nome_titular: '',
    numero_cartao: '',
    vencimento: '',
    cvv: '',
    cpf: ''
  };

  constructor(
    private cartaoService: CartaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCartoes();
  }

  carregarCartoes(): void {
    this.carregando = true;
    const usuarioStr = localStorage.getItem('user');
    if (!usuarioStr) {
      this.router.navigate(['/login']);
      return;
    }

    const usuario = JSON.parse(usuarioStr);
    this.cartaoService.getCartoesByUser(usuario.id).subscribe({
      next: (res) => {
        this.cartoes = res;
        this.carregando = false;
      },
      error: () => {
        const salvos = localStorage.getItem('cartoes_usuario');
        this.cartoes = salvos ? JSON.parse(salvos) : [];
        this.carregando = false;
      }
    });
  }

  adicionarCartao(): void {
    this.mostrarFormulario = true;
    this.erro = '';
  }

  cancelarAdicao(): void {
    this.mostrarFormulario = false;
    this.erro = '';
  }

  salvarCartao(): void {
    if (!this.formularioValido()) {
      this.erro = 'Preencha todos os campos corretamente.';
      return;
    }

    this.carregando = true;
    this.cartaoService.salvarCartao(this.novoCartao).subscribe({
      next: (res) => {
        this.cartoes.push(res);
        localStorage.setItem('cartoes_usuario', JSON.stringify(this.cartoes));
        this.mostrarFormulario = false;
        this.carregando = false;
        alert('Cartão salvo com sucesso!');
      },
      error: (err) => {
        this.erro = 'Erro ao salvar cartão no servidor.';
        this.carregando = false;
      }
    });
  }

  excluirCartao(id: number): void {
    if (!confirm('Deseja excluir este cartão?')) return;

    this.cartaoService.excluirCartao(id).subscribe({
      next: () => {
        this.cartoes = this.cartoes.filter(c => c.id !== id);
        localStorage.setItem('cartoes_usuario', JSON.stringify(this.cartoes));
      },
      error: () => {
        this.cartoes = this.cartoes.filter(c => c.id !== id);
        localStorage.setItem('cartoes_usuario', JSON.stringify(this.cartoes));
      }
    });
  }

  formatarNumeroCartao(num: string) {
    if (!num) return '';
    return '**** **** **** ' + num.slice(-4);
  }

  private formularioValido(): boolean {
    return (
      this.novoCartao.nome_titular.length > 0 &&
      this.novoCartao.numero_cartao.length >= 13 &&
      this.novoCartao.vencimento.length === 5 &&
      this.novoCartao.cvv.length >= 3 &&
      this.novoCartao.cpf.length >= 11
    );
  }
}
