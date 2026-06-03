import { Injectable, signal } from '@angular/core';

export type PaymentMethod = 'pix' | 'cartao' | null;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private _paymentMethod = signal<PaymentMethod>(this.getSavedPaymentMethod());

  paymentMethod = this._paymentMethod.asReadonly();

  setPaymentMethod(method: PaymentMethod): void {
    this._paymentMethod.set(method);

    if (typeof window !== 'undefined') {
      if (method) {
        localStorage.setItem('metodoPagamento', method);
      } else {
        localStorage.removeItem('metodoPagamento');
      }
    }
  }

  getPaymentMethod(): PaymentMethod {
    const currentMethod = this._paymentMethod();

    if (currentMethod) {
      return currentMethod;
    }

    return this.getSavedPaymentMethod();
  }

  getPaymentMethodName(): string {
    const method = this.getPaymentMethod();

    if (method === 'pix') return 'PIX';
    if (method === 'cartao') return 'Cartão de Crédito';

    return 'Não selecionado';
  }

  private getSavedPaymentMethod(): PaymentMethod {
    if (typeof window === 'undefined') {
      return null;
    }

    const saved = localStorage.getItem('metodoPagamento');

    if (saved === 'pix' || saved === 'cartao') {
      return saved;
    }

    return null;
  }
}