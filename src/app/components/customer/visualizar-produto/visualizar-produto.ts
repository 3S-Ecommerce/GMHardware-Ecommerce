import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ImagemProduto } from './imagem-produto/imagem-produto';
import { AdicionarProduto } from './adicionar-produto/adicionar-produto';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/services/product';
import { KeyValuePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-visualizar-produto',
  imports: [ImagemProduto, AdicionarProduto, Header, Footer],
  templateUrl: './visualizar-produto.html',
  styleUrl: './visualizar-produto.scss',
})
export class VisualizarProduto implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(Product);
  produto = signal<any>(null);

  constructor(private title: Title){}
  
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.pullProduct(id);
    }
    this.title.setTitle('Produto')
  }
  
  pullProduct(id: string) {
    this.api.getProduct(id).subscribe({
      next: (data) => {
        this.produto.set(data);
        console.log(this.produto())
      },
      error: (err) => {
        console.error('Error: ', err)
      }
    })
  }
  especificacoes = computed(() => {
    const lista = this.produto();
    return lista?.details ? Object.values(lista.details.split(',')) : [];
  }
  )
  teste(){
    console.log(this.especificacoes())
  }
}
