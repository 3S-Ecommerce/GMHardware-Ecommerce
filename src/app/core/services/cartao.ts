import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cartao {
  id: number;
  numero_cartao: string;
  vencimento: string;
  nome_titular: string;
}

export interface CartaoPayload {
  nome_titular: string;
  numero_cartao: string;
  vencimento: string;
  cvv: string;
  cpf: string;
}

@Injectable({
  providedIn: 'root'
} )
export class CartaoService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  salvarCartao(payload: CartaoPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/salvar-cartao`, payload, { headers: this.getAuthHeaders( ) });
  }

  getCartoesByUser(userId: number): Observable<Cartao[]> {
    // Nota: Verifique se no Laravel a rota é /api/meus-cartoes ou /api/user/{id}/cartoes
    return this.http.get<Cartao[]>(`${this.apiUrl}/meus-cartoes`, { headers: this.getAuthHeaders( ) });
  }

  excluirCartao(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/meus-cartoes/${id}`, { headers: this.getAuthHeaders( ) });
  }

   logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers: this.getAuthHeaders( ) });
  }
}
