import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Order {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api/order';

  getOrder(id: string) {
    const url = id !== "" && id !== 'null' ? `${this.apiUrl}/${id}` : `${this.apiUrl}`

    return this.http.get<any>(url)
    // if (item == "")
    //   return this.http.get<any[]>(this.apiUrl);
    // else {
    //   return this.http.get<any[]>(this.apiUrl+item);
    // }
  }

  createOrder(formdata: FormData) {
    return this.http.post(this.apiUrl, formdata);
  }

  updateOrder(formdata: FormData, id: string){
    return this.http.put(`${this.apiUrl}/${id}`, formdata)
  }
  
}
