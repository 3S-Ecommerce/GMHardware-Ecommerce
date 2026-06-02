import { NgOptimizedImage } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-imagem-produto',
  imports: [ NgOptimizedImage ],
  templateUrl: './imagem-produto.html',
  styleUrl: './imagem-produto.scss',
})
export class ImagemProduto {
  private readonly storageUrl = 'https://pub-38889ba16be84990a69dfca8fd011b2c.r2.dev/';
  
  // Guardará a lista de todas as fotos válidas que o produto possui
  galeriaImagens = signal<string[]>([]);
  
  // Guardará a URL completa da imagem selecionada em destaque no momento
  imagemEmDestaque = signal<string>('');

  @Input() set produto(dados: any) {
    if (!dados) return;

    const fotos: string[] = [];

    // Mapeamos os 5 campos possíveis de imagem vindos do Laravel
    const chavesImagem = ['image', 'image_2', 'image_3', 'image_4', 'image_5'];
    
    chavesImagem.forEach(chave => {
      if (dados[chave] && dados[chave] !== 'product/default.png') {
        fotos.push(`${this.storageUrl}${dados[chave]}`);
      }
    });

    // Se por acaso não houver nenhuma foto cadastrada, usa o fallback padrão
    if (fotos.length === 0) {
      fotos.push(`${this.storageUrl}products/default.png`);
    }

    this.galeriaImagens.set(fotos);
    
    // Inicialmente, a foto principal em destaque é a primeira do array (image)
    this.imagemEmDestaque.set(fotos[0]);
  }

  // Método reativo que altera o sinal mudando a imagem principal na tela instantaneamente
  selecionarImagem(url: string): void {
    this.imagemEmDestaque.set(url);
  }
}