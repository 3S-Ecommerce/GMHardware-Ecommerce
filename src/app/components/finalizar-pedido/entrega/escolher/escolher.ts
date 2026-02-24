import { Component } from '@angular/core';
import { FormaEntrega } from '../forma-entrega/forma-entrega';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-escolher',
  imports: [ FormaEntrega, RouterLink ],
  templateUrl: './escolher.html',
  styleUrl: './escolher.scss',
})
export class Escolher {

}
