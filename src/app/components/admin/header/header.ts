import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language';

@Component({
  selector: 'adm-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {

  language = inject(LanguageService);

  changeLanguage(lang: string) {

    this.language.changeLanguage(lang);

  }

}