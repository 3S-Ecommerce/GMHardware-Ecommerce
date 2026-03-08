import { NgOptimizedImage } from '@angular/common';
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-imagem-produto',
  imports: [ NgOptimizedImage ],
  templateUrl: './imagem-produto.html',
  styleUrl: './imagem-produto.scss',
})
export class ImagemProduto {
  @Input('url') image: string = ''
}
