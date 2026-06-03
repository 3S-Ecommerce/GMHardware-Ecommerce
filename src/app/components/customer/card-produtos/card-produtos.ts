import { Component, inject, signal, OnInit, Input, computed } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../../core/services/product';
import { Category } from '../../../core/services/category';
import { Cart } from '../../../core/services/cart';

export interface item {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number
}

@Component({
  selector: 'app-card-produtos',
  imports: [NgOptimizedImage, RouterLink, /*Loading*/],
  templateUrl: './card-produtos.html',
  styleUrl: './card-produtos.scss',
})

export class CardProdutos implements OnInit {
  router = inject(Router);
  @Input('categoria') categoria: string = 'todos';
  api = inject(Product);
  apiCat = inject(Category);
  cart = inject(Cart);
  //isLoading = Loading.isLoading
  static isLoading = signal(true);
  isLoading = CardProdutos.isLoading;
  todosProdutos = signal<any[]>([]);


  ngOnInit(): void {
    //Loading.isLoading.set(true)
    this.api.getProduct('').subscribe({
      next: (data) => {
        //Loading.isLoading.set(false)
        this.todosProdutos.set(data)
        this.isLoading.set(false)
      },
      error: (err) => {
        console.error('Erro: ', err)
      }
    })
  }
  comprarAgora(produtoID: number) {
    this.router.navigate(['/finalizar-compra'], {
      queryParams: {
        produto_id: produtoID,
        quantidade: 1, // 💡 Passando o valor atual do signal
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
  })

  adicionarCarrinho(item: item) {
    item.id = Number(item.id)
    item.price = Number(item.price)
    item.quantity = Number(item.quantity)
    console.log(item)
    if (this.cart.adicionarCarrinho(item))
      alert("Item adicionado ao carrinho!")
    else
      alert("Erro ao adicionar ao carrinho!")
  }
} 