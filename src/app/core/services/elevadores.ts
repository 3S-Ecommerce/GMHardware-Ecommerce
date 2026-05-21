import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class Elevadores {
   private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/elevador`;

  getElevador(id:string){
    const url = id != '' || id == null? `${this.apiUrl}/${id}` : `${this.apiUrl}`
    return this.http.get(url);
  }

  createElevador(formdata: FormData){
    return this.http.post(this.apiUrl, formdata);
  }

  updateElevador(formdata: FormData, id: string){
    return this.http.post(`${this.apiUrl}/${id}`, formdata);
  }
}
