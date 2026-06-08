import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrl {
  // private readonly apiUrl = 'http://localhost:8000/api';
  private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api';

  public getUrl(){
    return this.apiUrl
  }
}
