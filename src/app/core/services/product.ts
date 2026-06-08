import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from './api-url';

export interface ProductData {
  id: number;
  name: string;
  price: number;
  image_url: string;
  details?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Product {
  private http = inject(HttpClient);
  private api = inject(ApiUrl);
  private readonly apiUrl = this.api.getUrl();
  // private readonly apiUrl = 'http://localhost:8000/api/product';
  // private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api/product';

  searchProducts(query: string): Observable<ProductData[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<ProductData[]>(`${this.apiUrl}/products/search`, { params } );
  }


  getProduct(id: string) {
    const url = id !== "" && id !== 'null' ? `${this.apiUrl}/product/${id}` : `${this.apiUrl}/product`

    return this.http.get<any>(url)
    // if (item == "")
    //   return this.http.get<any[]>(this.apiUrl);
    // else {
    //   return this.http.get<any[]>(this.apiUrl+item);
    // }
  }

  createProduct(formdata: FormData) {
    return this.http.post(`${this.apiUrl}/product`, formdata);
  }

  updateProduct(formdata: FormData, id: string){
    return this.http.post(`${this.apiUrl}/product/${id}`, formdata)
  }
  
}
