import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { MaisVendidos } from "../mais-vendidos/mais-vendidos";

@Component({
  selector: 'app-apresentacao',
  imports: [NgOptimizedImage, MaisVendidos],
  templateUrl: './apresentacao.html',
  styleUrl: './apresentacao.scss',
})
export class Apresentacao {

}
