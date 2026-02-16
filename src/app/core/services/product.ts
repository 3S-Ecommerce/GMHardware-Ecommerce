import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Product {
  // private http = inject(HttpClient);
  // private readonly apiUrl = 'http://localhost:8000/produtos.php';
  // getProdutos(){
  //   return this.http.get<any[]>(this.apiUrl);
  // }
}
