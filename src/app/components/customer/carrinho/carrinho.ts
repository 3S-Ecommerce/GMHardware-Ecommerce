import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { Cart } from '../../../core/services/cart';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ItemCarrinho } from './item-carrinho/item-carrinho';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-carrinho',
  imports: [ Header, Footer, ItemCarrinho, RouterLink ],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho implements OnInit{
  private cart = inject(Cart);
  produtos = signal<any[]>([])
  totais = computed(() => {
    return this.cart.totalItems()
  })

  constructor(private title: Title){}

  ngOnInit(): void {
    this.produtos.set(this.cart.items())
    this.title.setTitle('Carrinho')
  }

  apagar(){
    this.cart.apagarCarrinho()
  }
  
  adicionar(){
    this.cart.adicionarCarrinho({id: 3, name: 'Teste2', price: 14.90, image: '../../', quantity: 2})
  }
}
