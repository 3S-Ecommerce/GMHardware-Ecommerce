import { Component } from '@angular/core';
import { FormaEntrega } from './forma-entrega/forma-entrega';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-entrega',
  imports: [ RouterOutlet ],
  templateUrl: './entrega.html',
  styleUrl: './entrega.scss',
})
export class Entrega {

}
