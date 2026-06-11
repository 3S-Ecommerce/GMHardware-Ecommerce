import { afterNextRender, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Language } from '../../../core/services/language';

@Component({
  selector: 'adm-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  language = inject(Language);
  router = inject(Router);

  constructor() {

    afterNextRender(() => {

      this.language.loadSavedLanguage();

    })

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
