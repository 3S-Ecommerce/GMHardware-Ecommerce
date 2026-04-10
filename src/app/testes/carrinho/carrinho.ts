import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { Cart } from '../../core/services/cart';
import { Header } from '../../components/customer/header/header';
import { Footer } from '../../components/customer/footer/footer';
import { ItemCarrinho } from './item-carrinho/item-carrinho';


@Component({
  selector: 'app-carrinho',
  imports: [ Header, Footer, ItemCarrinho ],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho implements OnInit{
  private cart = inject(Cart);
  produtos = signal<any[]>([])

  totais = computed(() => {
    return this.cart.totalItems()
  })

  ngOnInit(): void {
    this.produtos.set(this.cart.items())
  }
  total(){
    this.cart.testar()
  }

  apagar(){
    this.cart.apagarCarrinho()
  }
  
  adicionar(){
    this.cart.adicionarCarrinho({id: 3, name: 'Teste2', price: 14.90, image: '../../', quantity: 2})
  }
}
