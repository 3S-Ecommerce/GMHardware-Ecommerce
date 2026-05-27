import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Payment {

  api = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  createPix(data: any) {
    return this.http.post(`${this.api}/pix`, data);
  }
}