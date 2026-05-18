import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {

  currentLanguage = 'pt';

  async changeLanguage(lang: string) {

    this.currentLanguage = lang;

    localStorage.setItem('language', lang);

    const response = await fetch(`assets/i18n/${lang}.json`);

    const translations = await response.json();

    Object.keys(translations).forEach(id => {

      const element = document.getElementById(id);

      if (element) {

        element.innerText = translations[id];

      }

    });

  }

  async loadSavedLanguage() {

    const savedLanguage = localStorage.getItem('language');

    if (savedLanguage) {

      await this.changeLanguage(savedLanguage);

    }

  }

}