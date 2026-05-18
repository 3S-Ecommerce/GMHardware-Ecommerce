import { Component, computed, inject, OnInit, afterNextRender } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Cart } from '../../../core/services/cart';
import { LanguageService } from '../../../core/services/language';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header{
    language = inject(LanguageService);

    changeLanguage(lang: string) {

  this.language.changeLanguage(lang);

}


  cart = inject(Cart);
  quantidadeCarrinho = computed(() => {
      return this.cart.totalItems();
    })

  constructor(){
    afterNextRender(() => {
      this.cart.iniciar()
    })
  }

//   changeLanguage(lang: string) {

//   const currentPath = window.location.pathname;

//   const cleanPath = currentPath
//     .replace('/en', '')
//     .replace('/pt-BR', '');

//   window.location.href = `/${lang}${cleanPath}`;

// }
}
