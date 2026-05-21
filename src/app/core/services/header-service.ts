import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {

  titulo = signal<string>('Ińicio');
  setTitulo(novoTitulo: string){
    this.titulo.set(novoTitulo);
  }
}
