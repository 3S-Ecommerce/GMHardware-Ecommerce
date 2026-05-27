import { Component, computed, inject, OnInit, afterNextRender } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from "@angular/router";
import { Cart } from '../../../core/services/cart';
import { Auth } from '../../../core/services/auth';
import { LanguageService } from '../../../core/services/language';
import { SearchBarComponent } from '../../search-bar/search-bar'; 

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [RouterLink, SearchBarComponent], 
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header{
  authService = inject(Auth)
  language = inject(LanguageService);
  router = inject(Router);
  cart = inject(Cart);

  quantidadeCarrinho = computed(() => {
    return this.cart.totalItems();
  });

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

  changeLanguage(lang: string) {
    this.language.changeLanguage(lang);
  }
}
