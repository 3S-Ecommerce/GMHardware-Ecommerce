import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Category { 
  private http = inject(HttpClient);
  private readonly apiUrl = "http://127.0.0.1:8000/api/category";

  getCategory(id:string){
    const url = id !== '' ? `${this.apiUrl}/${id}` : `${this.apiUrl}`;
    return this.http.get<any>(url)
  }

  createCategory(){

  }

  updateCategory(){

  }
}
