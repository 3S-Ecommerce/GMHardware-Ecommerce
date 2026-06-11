import { Component, computed, inject, OnInit, afterNextRender } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { Cart } from '../../../core/services/cart';
import { Auth } from '../../../core/services/auth';
import { Language } from '../../../core/services/language';
import { SearchBarComponent } from '../search-bar/search-bar';

@Component({
  selector: 'app-header',
  imports: [RouterLink, SearchBarComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  language = inject(Language);
  authService = inject(Auth);
  router = inject(Router);
  cart = inject(Cart);
  quantidadeCarrinho = computed(() => { return this.cart.totalItems(); });

  constructor(){
    afterNextRender(() => {
      this.cart.iniciar();
      this.language.loadSavedLanguage();
      this.router.events.subscribe({
        next: (event) => {
          if (event instanceof NavigationEnd) {
            setTimeout(() => { this.language.loadSavedLanguage(); }, 100);
          }
        }
      });
    });
  }

  changeLanguage(lang: string){
    this.language.changeLanguage(lang);
  }
}