import { Component } from '@angular/core';
import { CardProdutos } from "../card-produtos/card-produtos";

@Component({
  selector: 'app-mais-vendidos',
  standalone: true,
  imports: [ CardProdutos ],
  templateUrl: './mais-vendidos.html',
  styleUrl: './mais-vendidos.scss',
})
export class MaisVendidos {

}
