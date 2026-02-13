import { Component, inject, signal, OnInit } from '@angular/core';
import { Product } from '../../core/services/product';
import { Cart } from '../../core/services/cart';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private produtoService = inject(Product);
  cart = inject(Cart);
  adicionarItem(item: any){
    this.cart.adicionarItem(item)
  }
  produtos = signal<any[]>([]);
  ngOnInit(): 
  void{
    this.produtoService.getProdutos().subscribe({
      next: (dados) =>{
        this.produtos.set(dados);
      },
      error: (err) => console.error('erro: ', err)
    });
  }
}
