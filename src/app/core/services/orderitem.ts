import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiUrl } from './api-url';

@Injectable({
  providedIn: 'root',
})
export class Orderitem {
  private http = inject(HttpClient);
  private api = inject(ApiUrl);
  private readonly apiUrl = this.api.getUrl();
  // private readonly apiUrl = 'http://localhost:8000/api/order-items';
  // private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api/order-items';

  getOrderItem(id: string) {
    const url = id !== "" && id !== 'null' ? `${this.apiUrl}/order-items/${id}` : `${this.apiUrl}/order-items`

    return this.http.get<any>(url)
    // if (item == "")
    //   return this.http.get<any[]>(this.apiUrl);
    // else {
    //   return this.http.get<any[]>(this.apiUrl+item);
    // }
  }

  createOrderItem(formdata: FormData) {
    return this.http.post(`${this.apiUrl}/order-items`, formdata);
  }

  updateOrderItem(formdata: FormData, id: string){
    return this.http.put(`${this.apiUrl}/order-items/${id}`, formdata)
  }
  
}
