import { NgOptimizedImage } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-imagem-produto',
  imports: [NgOptimizedImage],
  templateUrl: './imagem-produto.html',
  styleUrl: './imagem-produto.scss',
})
export class ImagemProduto {
  private readonly storageUrl = 'https://pub-38889ba16be84990a69dfca8fd011b2c.r2.dev/';
  galeriaImagens = signal<string[]>([]);
  imagemEmDestaque = signal<string>('');

  @Input() set produto(dados: any) {
    if (!dados) { return; }
    const fotos: string[] = [];
    const chavesImagem = ['image', 'image_2', 'image_3', 'image_4', 'image_5'];

    chavesImagem.forEach(chave => {
      if (dados[chave] && dados[chave] !== '') { fotos.push(`${this.storageUrl}${dados[chave]}`); }
    });
    if (fotos.length === 0) { fotos.push(`${this.storageUrl}products/default.png`); }
    this.galeriaImagens.set(fotos);
    this.imagemEmDestaque.set(fotos[0]);
  }

  selecionarImagem(url: string){
    this.imagemEmDestaque.set(url);
  }
}