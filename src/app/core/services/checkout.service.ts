import { Injectable, signal } from '@angular/core';

export type PaymentMethod = 'pix' | 'cartao' | null;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  // Inicializa o Signal direto com o valor do localStorage (SSR safe)
  private _paymentMethod = signal<PaymentMethod>(this.getSavedPaymentMethod());

  // Expõe como Readonly para os componentes assistirem às mudanças de estado nativas
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

  // Retorna o valor atual do Signal (reativo e sempre atualizado)
  getPaymentMethod(): PaymentMethod {
    return this._paymentMethod();
  }

  /**
   * Retorna o formato exato que a Request do Laravel espera receber
   * no campo 'payment_method' dentro do método checkout()
   */
  getPaymentMethodPayload(): string {
    const method = this.getPaymentMethod();
    return method ? method : ''; // Retorna 'pix' ou 'cartao'
  }

  /**
   * Usado apenas para exibição de texto amigável na View do HTML (.html)
   */
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