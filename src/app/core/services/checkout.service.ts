import { Injectable, signal } from '@angular/core';

// Definimos os tipos de pagamento permitidos
export type PaymentMethod = 'pix' | 'cartao' | null;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  // Usamos um Signal para armazenar o método de forma reativa
  private _paymentMethod = signal<PaymentMethod>(null);

  // Expondo o valor apenas para leitura
  paymentMethod = this._paymentMethod.asReadonly();

  // Função para salvar a escolha do usuário
  setPaymentMethod(method: PaymentMethod) {
    this._paymentMethod.set(method);
  }

  // Função auxiliar para retornar o nome formatado na tela de revisão
  getPaymentMethodName(): string {
    const method = this._paymentMethod();
    if (method === 'pix') return 'PIX';
    if (method === 'cartao') return 'Cartão de Crédito';
    return 'Não selecionado';
  }
}
