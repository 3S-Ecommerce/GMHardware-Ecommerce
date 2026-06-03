import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
} )
export class ComprasService {
  private readonly apiUrl = 'http://localhost:8000/api/orders';
  // private apiUrl = 'https://gmhardware-ecommerce.onrender.com/api/orders';

  constructor(private http: HttpClient ) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  listarCompras(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders( ) });
  }

   listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  obter(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  criarPedido(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, dados, { headers: this.getHeaders() });
  }

  atualizar(id: number, dados: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dados, { headers: this.getHeaders() });
  }

  /**
   * NOVO MÉTODO: Envia o pedido e os itens para o Laravel
   */
  finalizarCheckout(dadosPedido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, dadosPedido, { headers: this.getHeaders( ) });
  }
}
