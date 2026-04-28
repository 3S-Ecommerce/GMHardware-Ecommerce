import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, signal, afterNextRender, computed, inject } from '@angular/core';
import { Cart } from '../../../../core/services/cart';
import { RouterLink } from "@angular/router";

export interface item {
  id: Number,
  name: string,
  price: Number,
  image: string,
  quantity: Number
}

@Component({
  selector: 'app-item-carrinho',
  imports: [NgOptimizedImage, RouterLink],
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
  apagarItem(itemId: number) {
    if (confirm('Deseja remover esse item?')) {
      if (this.cart.apagarItem(itemId)) {
        alert('Item removido!')
      } else {
        console.error('Falha ao remover esse item')
      }
    }
  }
  teste() {
    console.log('teste')
  }
}
