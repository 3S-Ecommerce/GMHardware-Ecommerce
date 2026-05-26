import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Cartao {
  id: number;
  numero: string;
  vencimento: string;
}

@Component({
  selector: 'app-meus-cartoes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meus-cartoes.html',
  styleUrls: ['./meus-cartoes.scss']
})
export class MeusCartoes {

  cartoes: Cartao[] = [
    { id: 1, numero: 'Termina em 9022', vencimento: 'Vencimento: 12/30' },
    { id: 2, numero: 'Termina em 8014', vencimento: 'Vencimento: 12/30' },
    { id: 3, numero: 'Termina em 7001', vencimento: 'Vencimento: 12/30' }
  ];

  constructor(private router: Router) {}

  excluirCartao(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cartão?')) {
      this.cartoes = this.cartoes.filter(cartao => cartao.id !== id);
    }
  }

  adicionarCartao(): void {
    alert('Tela de adicionar cartão em desenvolvimento.');
    // futuramente:
    // this.router.navigate(['/novo-cartao']);
  }
}