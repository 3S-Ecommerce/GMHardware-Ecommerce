import { Component, inject, signal, OnInit, output, Input } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { Hardware } from '../../core/services/hardware';
import { error } from 'console';

@Component({
  selector: 'app-card-produtos',
  imports: [NgOptimizedImage],
  templateUrl: './card-produtos.html',
  styleUrl: './card-produtos.scss',
})
export class CardProdutos implements OnInit {
  @Input('categoria') categoria: string = '';
  api = inject(Hardware)
  produtos = signal<any[]>([]);
  ngOnInit(): void {
    this.api.getProdutos().subscribe({
      next: (data) => {
        this.produtos.set(data);
      },
      error: (err) => {
        console.error('Erro: ', err)
      }
    })
  }
} 
