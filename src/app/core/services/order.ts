import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from './api-url';

export interface CheckoutItem {
  id_product: number;
  quantity: number;
  price: number;
}

export interface CheckoutPayload {
  endereco_id: number | null;
  payment_method: string;
  card_id: number | null;
  total_price: number;
  items: CheckoutItem[];
}

@Injectable({
  providedIn: 'root',
})
export class Order {
  private http = inject(HttpClient);
  private api = inject(ApiUrl);
  private readonly apiUrl = this.api.getUrl();
  private readonly checkoutUrl = this.api.getUrl() + '/orders/checkout'
  // private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api/order';
  // private readonly checkoutUrl = 'https://gmhardware-ecommerce.onrender.com/api/orders/checkout';


  private getHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  getOrder(id: string = ''): Observable<any> {

    const url = id !== '' && id !== 'null' ? `${this.apiUrl}/order/${id}` : this.apiUrl;
    return this.http.get<any>(url, { headers: this.getHeaders() });

  }

  listarMinhasCompras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/order`, { headers: this.getHeaders() });
  }

  checkout(payload: CheckoutPayload): Observable<any> {
    return this.http.post(this.checkoutUrl, payload, { headers: this.getHeaders() });
  }

  createOrder(formdata: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/order`, formdata, { headers: this.getHeaders() });
  }

  updateOrder(formdata: FormData, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/order/${id}`, formdata, { headers: this.getHeaders() });
  }
}