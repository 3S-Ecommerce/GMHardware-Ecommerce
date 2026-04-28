import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, signal, afterNextRender, computed, inject } from '@angular/core';
import { Cart } from '../../../../core/services/cart';

export interface item {
  id: Number,
  name: string,
  price: Number,
  image: string,
  quantity: Number
}

@Component({
  selector: 'app-item-carrinho',
  imports: [NgOptimizedImage],
  templateUrl: './item-carrinho.html',
  styleUrl: './item-carrinho.scss',
})

export class ItemCarrinho {
  cart = inject(Cart);
  itens = signal<item[]>([]);
  produtos = computed(() => {
    return this.cart.items()
  })
  constructor() {
    afterNextRender(() => {
      const data = localStorage.getItem('carrinho');
      const array = JSON.parse(`${data}`)
      this.cart.cartItems.set(array)
      //console.log(this.produtos())
    })
  }

  menosProduto(itemId: number) {
    if (this.cart.removerCarrinho(Number(itemId)))
      alert('Item removido do carrinho!')
    else
      alert('Erro ao remover item do carrinho!')
  }
  maisProduto(itemId: number) {
    if (this.cart.somarProduto(itemId))
      alert('Item aumentado do carrinho!')
    else
      alert('Erro ao remover item do carrinho!')
  }
  teste() {
    console.log('teste')
  }
}
