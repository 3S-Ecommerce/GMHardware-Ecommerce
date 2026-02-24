import { Component, inject, signal, OnInit, output, Input, computed } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { Hardware } from '../../core/services/hardware';
import { RouterLink, RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-card-produtos',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './card-produtos.html',
  styleUrl: './card-produtos.scss',
})
export class CardProdutos implements OnInit {
  @Input('categoria') categoria: string = 'todos';
  api = inject(Hardware)
  todosProdutos = signal<any[]>([]);
  ngOnInit(): void {
    this.api.getProdutos().subscribe({
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
    
    if (categoria === 'todos'){
      return lista;
    }
    return lista.filter(p => p.categoria === categoria);
  })
} 
