import { computed, Injectable, OnInit, signal } from '@angular/core';
import { QueueAction } from 'rxjs/internal/scheduler/QueueAction';

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
    const existe = this.cartItems().find(i => i.id === item.id)
    if(existe){
      const updateItem = this.cartItems().map(i => i.id === item.id ? {...item, quantity: item.quantity + 1} : item)
      this.cartItems.set(updateItem);
    }else{
      this.cartItems.set([...this.cartItems(), {...item, quantity: 1}])
    }
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