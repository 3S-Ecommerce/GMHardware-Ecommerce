import { afterNextRender, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../../../../core/services/cart';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-revisar',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './revisar.html',
  styleUrl: './revisar.scss',
})
export class Revisar {
  constructor() {
    afterNextRender(() => {
      this.cart.iniciar()
    })
  }
  cart = inject(Cart);

  produtos = computed(() => {
    return this.cart.items()
  })
  valorTotal = computed(() => {
    return this.cart.valorTotal()
  })
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
}