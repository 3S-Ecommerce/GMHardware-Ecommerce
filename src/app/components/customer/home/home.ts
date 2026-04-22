import { Component, inject, signal, OnInit } from '@angular/core';
// import { Product } from '../../core/services/product';
// import { Cart } from '../../core/services/cart';
import { Header } from '../header/header';
//import { Apresentacao } from '../apresentacao/apresentacao';
//import { MaisVendidos } from "../mais-vendidos/mais-vendidos";
import { RouterOutlet } from "@angular/router";
import { Footer } from '../footer/footer';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ Header, Footer, /*Apresentacao, MaisVendidos,*/ RouterOutlet ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // private produtoService = inject(Product);
  // cart = inject(Cart);
  // adicionarItem(item: any){
  //   this.cart.adicionarItem(item)
  // }
  // produtos = signal<any[]>([]);
  // ngOnInit(): 
  // void{
  //   this.produtoService.getProdutos().subscribe({
  //     next: (dados) =>{
  //       this.produtos.set(dados);
  //     },
  //     error: (err) => console.error('erro: ', err)
  //   });
  // }

  title = '3SProjetoIntegrador'

  constructor(private titleService: Title){
    this.titleService.setTitle($localize `${this.title}`);
  }
}
