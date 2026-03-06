import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1:8000/api/product';

  getProduct(){
  return this.http.get<any[]>(this.apiUrl);
  }
  
  createProduct(formdata: FormData){
    return this.http.post(this.apiUrl, formdata);
  }
}
