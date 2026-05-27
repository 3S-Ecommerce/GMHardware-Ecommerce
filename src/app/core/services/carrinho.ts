import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Carrinho {


  carrinho = signal<any>([])
  
}
