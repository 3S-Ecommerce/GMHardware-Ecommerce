import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from './api-url';

@Injectable({
  providedIn: 'root',
})
export class Admin {
  private http = inject(HttpClient);
  private api = inject(ApiUrl);
  private readonly apiUrl = this.api.getUrl();
  // private readonly apiUrl = 'http://localhost:8000/api/admin';
  // private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api/admin';

  getAdmin(id: string) {
    const url = id !== "" && id !== 'null' ? `${this.apiUrl}/admin/${id}` : `${this.apiUrl}/admin`

    return this.http.get<any>(url)
    // if (item == "")
    //   return this.http.get<any[]>(this.apiUrl);
    // else {
    //   return this.http.get<any[]>(this.apiUrl+item);
    // }
  }

  createAdmin(formdata: FormData) {
    return this.http.post(`${this.apiUrl}/admin`, formdata);
  }

  updateAdmin(formdata: FormData, id: string) {
    return this.http.post(`${this.apiUrl}/admin/${id}`, formdata)
  }
}
