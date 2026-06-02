import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-finalizar-pedido',
  imports: [ RouterOutlet, Header, Footer ],
  templateUrl: './finalizar-pedido.html',
  styleUrl: './finalizar-pedido.scss',
})
export class FinalizarPedido implements OnInit{
  constructor(private title: Title){}
  ngOnInit(): void {
    this.title.setTitle('Finalizar Pedido')
  }
}
