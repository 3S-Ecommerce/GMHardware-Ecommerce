import { Component, computed, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adicionar-produto',
  imports: [ RouterLink ],
  templateUrl: './adicionar-produto.html',
  styleUrl: './adicionar-produto.scss',
})
export class AdicionarProduto {
  @Input() produtoID !: number;
  @Input() set price (price: string | number){
    this.precoBase.set(Number(price));
  }

  private precoBase = signal<number>(0)

  priceOriginal = computed(() => this.precoBase())
  pricePix = computed(() => this.precoBase() * 0.85)
  priceParcela = computed(() => this.precoBase() / 10)
  priceCartao = computed(() => this.precoBase() * 0.90)
  teste(){
    console.log(this.produtoID, this.precoBase)
  }
}
