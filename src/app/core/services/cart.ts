import { computed, Injectable, OnInit, signal } from '@angular/core';

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

export class Cart implements OnInit {

  ngOnInit(): void {
    const itens = localStorage.getItem('carrinho')
    console.log(itens)
  }

  private cartItems = signal<cartItem[]>([]);
  teste = []
  items = computed(() => this.cartItems());

  totalItems = computed(() => {
    return this.cartItems().reduce((acc, value) => acc + value.quantity, 0)
  })

  adicionarCarrinho(item: cartItem) {
    this.cartItems.update((lista) => [...lista, item])
    localStorage.setItem('carrinho', JSON.stringify(this.cartItems()))
  }

  apagarCarrinho() {
    this.cartItems.set([])
    localStorage.setItem('carrinho', JSON.stringify(this.cartItems()))
  }

  testar() {
    console.log(this.cartItems())
  }
}