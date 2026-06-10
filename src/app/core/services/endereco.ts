import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from './api-url';

export interface Endereco {
  id: number;
  zip_code: string;
  street: string;
  number: string;
  city: string;
  padrao: boolean | number;
}

export interface EnderecoPayload {
  zip_code: string;
  street: string;
  number: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private api = inject(ApiUrl)
  private readonly apiUrl = this.api.getUrl();
  // private readonly apiUrl = 'http://localhost:8000/api/addresses';
  // private apiUrl = 'https://gmhardware-ecommerce.onrender.com/api/addresses';

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    return localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  listar(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${this.apiUrl}/addresses`, { headers: this.getHeaders() });
  }

  salvar(dados: EnderecoPayload): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.apiUrl}/addresses`, dados, { headers: this.getHeaders() });
  }

  atualizar(id: number, dados: EnderecoPayload): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.apiUrl}/addresses/${id}`, dados, { headers: this.getHeaders() });
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/addresses/${id}`, { headers: this.getHeaders() });
  }

  definirPadrao(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/addresses/${id}/default`,{},{ headers: this.getHeaders() });
  }
}