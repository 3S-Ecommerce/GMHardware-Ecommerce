import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-devolucao',
  imports: [ Footer, Header],
  templateUrl: './devolucao.html',
  styleUrl: './devolucao.scss',
})
export class Devolucao {
  constructor(private title: Title){

    this.title.setTitle('Devolução')
    
  }
}
