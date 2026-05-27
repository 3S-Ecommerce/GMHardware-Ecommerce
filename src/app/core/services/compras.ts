import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
} )
export class ComprasService {
  private apiUrl = 'http://localhost:8000/api/orders';

  constructor(private http: HttpClient ) { }

 
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  
  listarCompras(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders( ) });
  }
}
