import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-garantia',
  imports: [ Footer, Header ],
  templateUrl: './garantia.html',
  styleUrl: './garantia.scss',
})
export class Garantia {
  constructor(private title: Title){
    this.title.setTitle("Garantia");
  }
}
