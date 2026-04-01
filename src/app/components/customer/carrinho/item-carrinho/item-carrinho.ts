import { Component } from '@angular/core';

@Component({
  selector: 'app-item-carrinho',
  imports: [],
  templateUrl: './item-carrinho.html',
  styleUrl: './item-carrinho.scss',
})
export class ItemCarrinho {
  preco = 1199;
  quantidade: number = 1;
  total = this.preco * this.quantidade;
  increase(): void {
    this.quantidade++;
    this.total = this.preco * this.quantidade;
  }

  decrease(): void {
    if (this.quantidade > 1) {
      this.quantidade--;
      this.total = this.preco * this.quantidade;
    }
  }
}
