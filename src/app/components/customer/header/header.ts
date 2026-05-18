import { Component, computed, inject, OnInit, afterNextRender } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from "@angular/router";
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
    router = inject(Router);

    changeLanguage(lang: string) {

  this.language.changeLanguage(lang);

  

}


  cart = inject(Cart);
  quantidadeCarrinho = computed(() => {
      return this.cart.totalItems();
    })
constructor() {

  afterNextRender(() => {

    this.cart.iniciar();

    this.language.loadSavedLanguage();

  });

  this.router.events.subscribe(event => {

    if (event instanceof NavigationEnd) {

      setTimeout(() => {

        this.language.loadSavedLanguage();

      }, 100);

    }

  });

}

 
//   changeLanguage(lang: string) {

//   const currentPath = window.location.pathname;

//   const cleanPath = currentPath
//     .replace('/en', '')
//     .replace('/pt-BR', '');

//   window.location.href = `/${lang}${cleanPath}`;

// }
}
