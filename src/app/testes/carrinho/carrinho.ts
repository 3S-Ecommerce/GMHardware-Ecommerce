import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { Cart } from '../../core/services/cart';
import { Header } from '../../components/customer/header/header';
import { Footer } from '../../components/customer/footer/footer';
import { MaisVendidos } from '../../components/customer/mais-vendidos/mais-vendidos';

@Component({
  selector: 'app-carrinho',
  imports: [ Header, Footer, MaisVendidos ],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho implements OnInit {
  private cart = inject(Cart);
  produtos = computed(() =>{
    return this.cart.items()
  })

  ngOnInit(): void {
  }

  totais = computed(() => {
    return this.cart.totalItems()
  })
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
