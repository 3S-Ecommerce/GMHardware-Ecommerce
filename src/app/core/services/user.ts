import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api/user';

  getUser(id: string) {
    const url = id !== "" && id !== 'null' ? `${this.apiUrl}/${id}` : `${this.apiUrl}`

    return this.http.get<any>(url)
    // if (item == "")
    //   return this.http.get<any[]>(this.apiUrl);
    // else {
    //   return this.http.get<any[]>(this.apiUrl+item);
    // }
  }

  createUser(formdata: FormData) {
    return this.http.post(this.apiUrl, formdata);
  }

  updateUser(formdata: FormData, id: string){
    return this.http.put(`${this.apiUrl}/${id}`, formdata)
  }
  
}
