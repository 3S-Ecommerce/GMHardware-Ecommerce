import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Hardware {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/product';
  
  produtosapi= signal<any[]>([]);

  getProdutos(){
    return this.http.get<any[]>(this.apiUrl)
  }
}
