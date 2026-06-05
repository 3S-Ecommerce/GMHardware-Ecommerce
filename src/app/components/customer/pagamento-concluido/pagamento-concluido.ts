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
  route = inject(Router)
  
  // Dados simulados do pedido. Em produção, você pode buscar de um Service ou do ActivatedRoute
  order: OrderSummary = {
    id: 'GM-2026-8943',
    date: new Date().toLocaleDateString('pt-BR'),
    paymentMethod: 'Cartão',
    deliveryEstimate: '2 e 5 dias úteis'
  };
  redirect(tipo:string){
    if(tipo === 'home')
      this.route.navigate(['/inicio'])
    if(tipo === 'minhas')
      this.route.navigate(['/minhas-compras'])
  }
  constructor() {}

  ngOnInit(): void {
    // Aqui você pode capturar dados passados pela rota se necessário
  }
}
