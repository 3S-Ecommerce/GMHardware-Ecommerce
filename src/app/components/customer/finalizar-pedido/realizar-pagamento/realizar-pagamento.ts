import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../../../core/services/checkout.service';
// Importe os componentes (verifique se os nomes das classes são Pix e Cartao)
import { Pix } from './pix/pix';
import { Cartao } from './cartao/cartao';

@Component({
  selector: 'app-realizar-pagamento',
  standalone: true,
  // Adicionamos os componentes aqui para o Angular poder usar as tags no HTML
  imports: [CommonModule, Pix, Cartao],
  templateUrl: './realizar-pagamento.html',
  styleUrl: './realizar-pagamento.scss',
})
export class RealizarPagamento {
  private checkoutService = inject(CheckoutService);

  // Criamos uma variável que observa qual método foi escolhido
  metodo = computed(() => this.checkoutService.paymentMethod());
}
