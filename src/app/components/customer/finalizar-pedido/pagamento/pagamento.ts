import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from "@angular/router"; // 1. Importe ActivatedRoute
import { CheckoutService, PaymentMethod } from '../../../../core/services/checkout.service';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.scss',
})
export class Pagamento {
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // 2. Injete o ActivatedRoute

selecionarPagamento(metodo: PaymentMethod) {
  this.checkoutService.setPaymentMethod(metodo);
  // Caminho corrigido baseado no seu app.routes.ts
  this.router.navigate(['/finalizar-compra/revisar']);
}

}
