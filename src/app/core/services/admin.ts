import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Admin {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api/admin';

  getAdmin(id: string) {
    const url = id !== "" && id !== 'null' ? `${this.apiUrl}/${id}` : `${this.apiUrl}`

    return this.http.get<any>(url)
    // if (item == "")
    //   return this.http.get<any[]>(this.apiUrl);
    // else {
    //   return this.http.get<any[]>(this.apiUrl+item);
    // }
  }

  createAdmin(formdata: FormData) {
    return this.http.post(this.apiUrl, formdata);
  }

  updateAdmin(formdata: FormData, id: string) {
    return this.http.post(`${this.apiUrl}/${id}`, formdata)
  }
}
