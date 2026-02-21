import { Component } from '@angular/core';
import { ImagemProduto } from './imagem-produto/imagem-produto';
import { AdicionarProduto } from './adicionar-produto/adicionar-produto';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-visualizar-produto',
  imports: [ ImagemProduto, AdicionarProduto, Header, Footer ],
  templateUrl: './visualizar-produto.html',
  styleUrl: './visualizar-produto.scss',
})
export class VisualizarProduto {

}
