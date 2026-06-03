import { Component, computed, inject, Input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common'; // 💡 INCLUSÃO AQUI
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Cart } from '../../../../core/services/cart';
registerLocaleData(localePt);

@Component({
  selector: 'app-adicionar-produto',
  imports: [CurrencyPipe], // 💡 ADICIONADO AOS IMPORTS
  templateUrl: './adicionar-produto.html',
  styleUrl: './adicionar-produto.scss',
})
export class AdicionarProduto {
  private cartService = inject(Cart);
  private router = inject(Router);
  @Input() produtoID !: number;
  @Input() set price(price: string | number) {
    this.precoBase.set(Number(price));
  }
  @Input() name !: string;
  @Input() image !: string;


  private precoBase = signal<number>(0);
  priceOriginal = computed(() => this.precoBase());
  pricePix = computed(() => this.precoBase() * 0.85);
  priceParcela = computed(() => this.precoBase() / 10);
  priceCartao = computed(() => this.precoBase() * 0.90);
  
  quantidade = signal<number>(1);
  comprarAgora() {
    this.router.navigate(['/finalizar-compra'], {
      queryParams: {
        produto_id: this.produtoID,
        quantidade: this.quantidade() // 💡 Passando o valor atual do signal
      }
    });
  }

  alterarQuantidade(valor: number): void {
    const novaQtde = this.quantidade() + valor;
    if (novaQtde >= 1) {
      this.quantidade.set(novaQtde);
    }
  }

  adicionarAoCarrinhoComQtde(): void {
    // Busca a lista salva para ver se o produto já existe
    this.cartService.iniciar();

    const itemMapeado = {
      id: this.produtoID,
      name: this.name, // O nome será resolvido pelo restante do seu fluxo/API
      price: this.precoBase(),
      image: 'https://pub-38889ba16be84990a69dfca8fd011b2c.r2.dev' + this.image,
      quantity: this.quantidade()
    };

    // Laço simples para repetir a inserção baseada na quantidade escolhida se o seu adicionarCarrinho colocar +1 por clique
    // Ou se preferir ajustar o CartService no futuro. Para o seu método atual, faremos ele rodar N vezes:
    for (let i = 0; i < this.quantidade(); i++) {
      this.cartService.adicionarCarrinho(itemMapeado);
    }

    alert(`${this.quantidade()} item(ns) adicionado(s) ao carrinho!`);
    this.quantidade.set(1); // Reseta para 1 após adicionar
  }

  teste() {
    console.log(this.produtoID, this.precoBase(), 'Quantidade selecionada:', this.quantidade());
  }
}