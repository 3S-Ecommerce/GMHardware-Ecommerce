import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-finalizar-pedido',
  imports: [ RouterOutlet, Header, Footer ],
  templateUrl: './finalizar-pedido.html',
  styleUrl: './finalizar-pedido.scss',
})
export class FinalizarPedido {

}
