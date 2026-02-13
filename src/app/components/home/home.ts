import { Component, inject, signal, OnInit } from '@angular/core';
import { Product } from '../../core/services/product';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private produtoService = inject(Product);
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
