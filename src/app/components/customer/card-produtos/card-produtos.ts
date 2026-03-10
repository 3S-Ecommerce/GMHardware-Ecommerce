import { Component, inject, signal, OnInit, output, Input, computed } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router'; 
import { Product } from '../../../core/services/product';
import { Loading } from '../loading/loading';
import { Category } from '../../../core/services/category';

@Component({
  selector: 'app-card-produtos',
  imports: [ NgOptimizedImage, RouterLink, /*Loading*/ ],
  templateUrl: './card-produtos.html',
  styleUrl: './card-produtos.scss',
})
export class CardProdutos implements OnInit {
  @Input('categoria') categoria: string = 'todos';
  api = inject(Product)
  apiCat = inject(Category)
  //isLoading = Loading.isLoading
  static isLoading = signal(true);
  isLoading = CardProdutos.isLoading;
  todosProdutos = signal<any[]>([]);
  oie = signal<any[]>([]);
  qlfoi = signal<any>(null);
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
  produtos = computed(() => {
    const categoria = this.categoria;
    const lista = this.todosProdutos();
    
    if (categoria === 'todos' || !categoria){
      
      return lista;
    }
    return lista.filter(p => p.category?.name === categoria);
  })
} 