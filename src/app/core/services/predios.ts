import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class Predios {
  private http = inject(HttpClient);
  private readonly apiUrl: string = `${environment.apiUrl}/predio`

  getPredio(id: string, consulta: string){
    const url = id != '' ? `${this.apiUrl}/${id}` : `${this.apiUrl}`
    const urlConsulta = consulta != '' ? `${url}?include=${consulta}` : `${url}`
    return this.http.get(urlConsulta);
  }

  createPredio(formdata: FormData){
    return this.http.post(this.apiUrl, formdata)
  }

  updatePredio(formdata: FormData, id: string){
    return this.http.post(`${this.apiUrl}/${id}`, formdata);
  }
}
