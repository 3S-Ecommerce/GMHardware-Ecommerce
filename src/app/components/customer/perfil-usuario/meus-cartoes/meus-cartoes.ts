import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  mostrarFormulario = false;
  carregando = false;
  erro = '';
  novoCartao: CartaoPayload = {nome_titular: '', numero_cartao: '', vencimento: '', cvv: '', cpf: ''};

  constructor(private cartaoService: CartaoService, private router: Router, private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.carregarCartoes();
  }

  carregarCartoes(){
    this.carregando = true;
    const usuarioStr = localStorage.getItem('user');
    if (!usuarioStr) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartaoService.getCartoesByUser().subscribe({
      next: (res) => {
        this.cartoes = res;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  adicionarCartao(){
    this.mostrarFormulario = true;
    this.erro = '';
  }

  cancelarAdicao(){
    this.mostrarFormulario = false;
    this.erro = '';
    this.novoCartao = {nome_titular: '', numero_cartao: '', vencimento: '', cvv: '', cpf: ''};
  }

  salvarCartao(){
    if (!this.formularioValido()) {
      this.erro = 'Preencha todos os campos corretamente.';
      return;
    }
    this.carregando = true;

    this.cartaoService.salvarCartao(this.novoCartao).subscribe({
      next: () => {
        this.mostrarFormulario = false;
        this.carregando = false;
        this.novoCartao = {nome_titular: '', numero_cartao: '', vencimento: '', cvv: '', cpf: ''};
        this.carregarCartoes();
        alert('Cartão saved com sucesso!');
      },
      error: (err) => {
        console.error(err);
        this.erro = 'Erro ao salvar cartão.';
        this.carregando = false;
      }
    });
  }

  excluirCartao(id: number){
    if (!confirm('Deseja excluir este cartão?')) { return; }

    this.cartaoService.excluirCartao(id).subscribe({
      next: () => {
        this.carregarCartoes();
        alert('Cartão removido com sucesso!');
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao excluir cartão.');
      }
    });
  }

  definirPadrao(id: number){
    this.cartaoService.definirPadrao(id).subscribe({
      next: () => {
        this.cartoes.forEach(cartao => { cartao.is_default = cartao.id === id; });
        this.cdr.detectChanges();
        alert('Cartão definido como padrão!');
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao definir cartão padrão.');
      }
    });
  }

  formatarNumeroCartao(numero: string): string {
    if (!numero) { return ''; }
    return '**** **** **** ' + numero.slice(-4);
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