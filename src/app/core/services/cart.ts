import { computed, Injectable, signal } from '@angular/core';

export interface cartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number
}

@Injectable({
  providedIn: 'root',
})

export class Cart {

  private cartItems = signal<cartItem[]>([
    {id: 1, name: 'Teste', price: 15.90, image: '../..', quantity: 2},
    {id: 2, name: 'Teste2', price: 14.90, image: '../../', quantity: 5},
    {id: 3, name: 'Teste2', price: 14.90, image: '../../', quantity: 5}
  ]);
  teste = []
  items = computed(() => this.cartItems());

  totalItems = computed(() => {
    return this.cartItems().reduce((acc, value) => acc + value.quantity, 0)
  })

  adicionarCarrinho(item: any){
    this.cartItems.update((lista) => [...lista, item])
  }

  testar(){
    console.log(this.cartItems())
  }
}
