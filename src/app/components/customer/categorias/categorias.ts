import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardProdutos } from '../card-produtos/card-produtos';

@Component({
  selector: 'app-categorias',
  imports: [ CardProdutos ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class Categorias {

  categoriaAtual: string = '';

  constructor(private route: ActivatedRoute) {

    this.route.data.subscribe(data => {

      this.categoriaAtual = data['categoria'];
      
    })
  }
}
