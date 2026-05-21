import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class Pendencia {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/pendencia`;

  getPendencia(id:string, consulta: string){
    const url = id != '' ? `${this.apiUrl}/${id}` : `${this.apiUrl}`
    const urlConsulta = consulta != '' ? `${url}?include=${consulta}` : `${url}`
    return this.http.get(urlConsulta);
  }

  createPendencia(formdata: FormData){
    return this.http.post(this.apiUrl, formdata);
  }

  updatePendencia(formdata: FormData, id: string){
    return this.http.post(`${this.apiUrl}/${id}`, formdata);
  }
}
