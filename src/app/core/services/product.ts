import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1:8000/api/product';

  getProduct(id: string) {
    const url = id !== "" ? `${this.apiUrl}/${id}` : `${this.apiUrl}`

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

  updateProduct(formdata: FormData, item: string){
    return this.http.put(this.apiUrl+item, formdata)
  }
  
}
