import { Component, computed, inject, OnInit, afterNextRender } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Cart } from '../../../core/services/cart';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header{
  cart = inject(Cart);
  quantidadeCarrinho = computed(() => {
      return this.cart.totalItems();
    })

  constructor(){
    afterNextRender(() => {
      this.cart.iniciar()
    })
  }
}
