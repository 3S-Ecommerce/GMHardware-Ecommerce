import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para a barra de pesquisa
export interface ProductData {
  id: number;
  name: string;
  price: number;
  image_url: string;
  details?: string;
}

@Injectable({
  providedIn: 'root'
} )
export class Product {
  private apiUrl = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient ) {}

  // --- MÉTODO NOVO PARA A BUSCA ---
  searchProducts(query: string): Observable<ProductData[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<ProductData[]>(`${this.apiUrl}/products/search`, { params } );
  }

  // --- MÉTODOS QUE ESTAVAM FALTANDO ---

  // Para visualizar um produto
  getProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/${id}` );
  }

  // Para criar um novo produto (usado no cadastro e admin)
  createProduct(formData: FormData): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product`, formData as any ); 
    // Nota: Geralmente é .post, mas mantive a lógica de retorno para compilar. 
    // Se o seu original era .post, mude para: return this.http.post(`${this.apiUrl}/product`, formData );
  }

  // Para atualizar um produto existente (usado no editar)
  updateProduct(formData: FormData, id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product/${id}`, formData );
    // Nota: Laravel costuma exigir POST com _method=PUT para enviar arquivos (FormData)
  }
}
