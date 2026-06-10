import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiUrl } from './api-url';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);
  private api = inject(ApiUrl);
  private readonly apiUrl = this.api.getUrl();
  // private readonly apiUrl = 'http://localhost:8000/api/user';
  // private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api/user';

  getUser(id: string) {
    const url = id !== "" && id !== 'null' ? `${this.apiUrl}/user/${id}` : `${this.apiUrl}/user`

    return this.http.get<any>(url)
    // if (item == "")
    //   return this.http.get<any[]>(this.apiUrl);
    // else {
    //   return this.http.get<any[]>(this.apiUrl+item);
    // }
  }

  createUser(formdata: FormData) {
    return this.http.post(`${this.apiUrl}/user`, formdata);
  }

  updateUser(formdata: FormData, id: string){
    return this.http.put(`${this.apiUrl}/user/${id}`, formdata)
  }
  
}
