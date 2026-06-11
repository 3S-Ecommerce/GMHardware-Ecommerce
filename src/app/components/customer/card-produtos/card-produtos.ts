import { Component, inject, signal, OnInit, Input, computed, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../../core/services/product';
import { Category } from '../../../core/services/category';
import { Cart } from '../../../core/services/cart';
import { Language } from '../../../core/services/language';

export interface item {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number
}

@Component({
  selector: 'app-card-produtos',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './card-produtos.html',
  styleUrl: './card-produtos.scss',
})
export class CardProdutos implements OnInit, OnDestroy {
  router = inject(Router);
  @Input('categoria') categoria: string = 'todos';
  api = inject(Product);
  apiCat = inject(Category);
  cart = inject(Cart);
  lang = inject(Language);
  
  static isLoading = signal(true);
  isLoading = CardProdutos.isLoading;
  todosProdutos = signal<any[]>([]);

  ngOnInit(): void {
    this.api.getProduct('').subscribe({
      next: (data) => {
        setTimeout(() => {
          this.todosProdutos.set(data);
          this.isLoading.update(p => false);
          console.log(this.todosProdutos());
        }, 0);
      },
      error: (err) => {
        console.error('Erro: ', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.isLoading.update(p => true);
  }

  comprarAgora(produtoID: number) {
    this.router.navigate(['/finalizar-compra'], {
      queryParams: {
        produto_id: produtoID,
        quantidade: 1,
      }
    });
  }

  produtos = computed(() => {
    const categoria = this.categoria;
    const lista = this.todosProdutos();

    if (categoria === 'todos' || !categoria) {
      return lista;
    }
    return lista.filter(p => p.category?.name === categoria);
  });

  adicionarCarrinho(item: item) {
    item.id = Number(item.id);
    item.price = Number(item.price);
    item.quantity = Number(item.quantity);
    console.log(item);
    if (this.cart.adicionarCarrinho(item))
      alert("Item adicionado ao carrinho!");
    else
      alert("Erro ao adicionar ao carrinho!");
  }

  /**
   * 💡 Formata o preço com base no idioma atual do app
   * @param precoValor String ou número vindo da API (ex: "2500.00")
   */
  formatarPreco(precoValor: string | number): string {
    const precoNum = Number(precoValor);
    
    if (isNaN(precoNum)) return '0,00';

    const idioma = this.lang.puxarLingua(); // Retorna 'pt' ou 'en'

    if (idioma === 'en') {
      // Padrão Americano: Milhar com vírgula, decimal com ponto ($2,500.00)
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(precoNum);
    } else {
      // Padrão Brasileiro: Milhar com ponto, decimal com vírgula (R$ 2.500,00)
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(precoNum);
    }
  }

  teste() {
    console.log(this.lang.puxarLingua());
  }
}