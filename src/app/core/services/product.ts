import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private readonly apiUrl = 'http://127.0.0.1:8000/api/product';

  searchProducts(query: string): Observable<ProductData[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<ProductData[]>(`${this.apiUrl}s/search`, { params } );
  }


  getProduct(id: string) {
    const url = id !== "" && id !== 'null' ? `${this.apiUrl}/${id}` : `${this.apiUrl}`

    return this.http.get<any>(url)
    // if (item == "")
    //   return this.http.get<any[]>(this.apiUrl);
    // else {
    //   return this.http.get<any[]>(this.apiUrl+item);
    // }
  }

  createProduct(formdata: FormData) {
    return this.http.post(this.apiUrl, formdata);
  }

  updateProduct(formdata: FormData, id: string){
    return this.http.post(`${this.apiUrl}/${id}`, formdata)
  }
  
}
