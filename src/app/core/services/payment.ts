import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class Payment {
  private api = inject(ApiUrl);
  private readonly apiUrl = this.api.getUrl();
  // private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api/';
  // private readonly api = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  createPix(data: any) {
    return this.http.post(`${this.apiUrl}/pix`, data);
  }
}