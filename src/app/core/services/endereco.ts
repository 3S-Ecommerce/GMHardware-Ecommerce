import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Endereco {
  id: number;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  type: string;
  contact_name: string;
  contact_phone: string;
}

@Injectable({ providedIn: 'root' } )
export class EnderecoService {
  private apiUrl = 'http://localhost:8000/api/addresses';

  constructor(private http: HttpClient ) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  listar(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.apiUrl, { headers: this.getHeaders( ) });
  }

  salvar(dados: any): Observable<Endereco> {
    return this.http.post<Endereco>(this.apiUrl, dados, { headers: this.getHeaders( ) });
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders( ) });
  }
}
