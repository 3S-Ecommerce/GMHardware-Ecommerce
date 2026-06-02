import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-contato',
  imports: [ Footer, Header ],
  templateUrl: './contato.html',
  styleUrl: './contato.scss',
})
export class Contato {

}
