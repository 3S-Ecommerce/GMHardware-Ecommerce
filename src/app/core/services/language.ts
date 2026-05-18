import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {

  async changeLanguage(lang: string) {

    const response = await fetch(`assets/i18n/${lang}.json`);

    const translations = await response.json();

    Object.keys(translations).forEach(id => {

      const element = document.getElementById(id);

      if (element) {

        element.innerText = translations[id];

      }

    });

  }

}