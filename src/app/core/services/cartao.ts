import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cartao {
  id: number;
  numero_cartao: string;
  vencimento: string;
  nome_titular: string;
  is_default: boolean;
}

export interface CartaoPayload {
  numero_cartao: string;
  vencimento: string;
  nome_titular: string;
  cvv: string;
  cpf: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  listar(): Observable<Cartao[]> {
    return this.http.get<Cartao[]>(
      `${this.apiUrl}/meus-cartoes`,
      { headers: this.getAuthHeaders() }
    );
  }

  getCartoesByUser(): Observable<Cartao[]> {
    return this.http.get<Cartao[]>(
      `${this.apiUrl}/meus-cartoes`,
      { headers: this.getAuthHeaders() }
    );
  }

  salvarCartao(payload: CartaoPayload): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/salvar-cartao`,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  excluirCartao(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/salvar-cartao/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  definirPadrao(id: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/cartoes/${id}/default`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
}