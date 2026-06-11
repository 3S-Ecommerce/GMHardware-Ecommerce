import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  inject,
  Injectable
} from '@angular/core';

import { Observable } from 'rxjs';
import { ApiUrl } from './api-url';

export interface FreteItem {
  id: number;
  quantity: number;
  price: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
}

export interface FretePayload {
  cep_destino: string;
  items: FreteItem[];
}

export interface FreteEmpresa {
  id?: number;
  name?: string;
  picture?: string;
}

export interface FreteOpcao {
  id: number;
  name: string;
  price: string | number;
  custom_price?: string | number;
  delivery_time: number;
  custom_delivery_time?: number;
  error?: string;

  company?: FreteEmpresa;
}

@Injectable({
  providedIn: 'root'
})
export class FreteService {
  private http = inject(HttpClient);
  private api = inject(ApiUrl)
  private readonly apiUrl = this.api.getUrl();

  private getAuthHeaders(): HttpHeaders {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('token')
        : null;

    let headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set(
        'Authorization',
        `Bearer ${token}`
      );
    }

    return headers;
  }

  calcularFrete(
    payload: FretePayload
  ): Observable<FreteOpcao[]> {
    return this.http.post<FreteOpcao[]>(
      `${this.apiUrl}/calcular-frete`,
      payload,
      {
        headers: this.getAuthHeaders()
      }
    );
  }
}