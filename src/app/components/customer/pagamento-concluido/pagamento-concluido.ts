import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface OrderSummary {
  id: string;
  date: string;
  paymentMethod: string;
  deliveryEstimate: string;
}

@Component({
  selector: 'app-pagamento-concluido',
  imports: [],
  templateUrl: './pagamento-concluido.html',
  styleUrl: './pagamento-concluido.scss',
})
export class PagamentoConcluido implements OnInit {
  route = inject(Router);
  order: OrderSummary = {id: 'GM-2026-8943', date: new Date().toLocaleDateString('pt-BR'), paymentMethod: 'Cartão', deliveryEstimate: '2 e 5 dias úteis'};

  constructor(){}

  ngOnInit(){
  }

  redirect(tipo: string){
    if (tipo === 'home') { this.route.navigate(['/inicio']); }
    if (tipo === 'minhas') { this.route.navigate(['/minhas-compras']); }
  }
}