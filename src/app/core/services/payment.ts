import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Payment {

  api = 'https://gmhardware-ecommerce.onrender.com/api';

  constructor(private http: HttpClient) {}

  createPix(data: any) {
    return this.http.post(`${this.api}/pix`, data);
  }
}