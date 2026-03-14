import { Component } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  imports: [],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {

  quantidade: number = 1;

  increase(): void {
    this.quantidade++;
  }

  decrease(): void {
    if(this.quantidade > 1){
    this.quantidade--;
  }
}

}
