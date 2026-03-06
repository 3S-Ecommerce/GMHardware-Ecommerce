import { Component, inject, signal, OnInit, output, Input, computed } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { RouterLink, RouterOutlet } from '@angular/router'; 
import { Product } from '../../core/services/product';

@Component({
  selector: 'app-card-produtos',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './card-produtos.html',
  styleUrl: './card-produtos.scss',
})
export class CardProdutos /*implements OnInit*/ {
  @Input('categoria') categoria: string = 'todos';
  api = inject(Product)
  todosProdutos = signal<any[]>([]);
  ngOnInit(): void {
    this.api.getProduct().subscribe({
      next: (data) => {
        this.todosProdutos.set(data);
      },
      error: (err) => {
        console.error('Erro: ', err)
      }
    })
  }
  produtos = computed(() => {
    const categoria = this.categoria;
    const lista = this.todosProdutos();
    
    if (categoria === 'todos' || !categoria){
      return lista;
    }
    return lista.filter(p => p.category?.name === categoria);
  })
  teste(){
    const lista = this.todosProdutos();
    console.log(lista.filter(p => p.category?.name === this.categoria))
  }
} 
