import { Component } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  imports: [],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {

  preco = 1199;
  quantidade: number = 1;
  total = this.preco * this.quantidade;

  increase(): void {
    this.quantidade++;
      this.total = this.preco * this.quantidade;

  }

  decrease(): void {
    if(this.quantidade > 1){
    this.quantidade--;
          this.total = this.preco * this.quantidade;

  }

  


}

}
