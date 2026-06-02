import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para a resposta da API
export interface Cartao {
  id: number;
  numero_cartao: string;
  vencimento: string;
  nome_titular: string;
}

// Interface para o envio de dados (Payload ) - AGORA COM CVV E CPF
export interface CartaoPayload {
  numero_cartao: string;
  vencimento: string;
  nome_titular: string;
  cvv: string; // Adicionado
  cpf: string; // Adicionado
}

@Injectable({ providedIn: 'root' })
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

  listar(): Observable<Cartao[]> {
    return this.http.get<Cartao[]>(`${this.apiUrl}/meus-cartoes`, { headers: this.getAuthHeaders( ) });
  }

  getCartoesByUser(userId: number): Observable<Cartao[]> {
    // Certifique-se de que este endpoint existe no seu Laravel
    return this.http.get<Cartao[]>(`${this.apiUrl}/meus-cartoes/usuario/${userId}`, { headers: this.getAuthHeaders( ) });
  }

  salvarCartao(payload: CartaoPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/salvar-cartao`, payload, { headers: this.getAuthHeaders( ) });
  }

  // Nome do método de exclusão ajustado para corresponder ao componente
  excluirCartao(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/meus-cartoes/${id}`, { headers: this.getAuthHeaders( ) });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers: this.getAuthHeaders( ) });
  }
}
