import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from './api-url';

@Injectable({
  providedIn: 'root',
})
export class Category { 
  private http = inject(HttpClient);
  private api = inject(ApiUrl);
  private readonly apiUrl = this.api.getUrl();
  // private readonly apiUrl = 'http://localhost:8000/api/category';
  // private readonly apiUrl = "https://gmhardware-ecommerce.onrender.com/api/category";

  getCategory(id:string){
    const url = id !== '' && id !== 'null' ? `${this.apiUrl}/category/${id}` : `${this.apiUrl}/category`;
    return this.http.get<any>(url)
  }

  createCategory(formdata: FormData){
    return this.http.post(`${this.apiUrl}/category`, formdata)
  }

  updateCategory(formdata: FormData, id:string){
    return this.http.put(`${this.apiUrl}/category/${id}`, formdata)
  }
  deleteCategory(id: string) {
  return this.http.delete(`${this.apiUrl}/category/${id}`);
} 
}
