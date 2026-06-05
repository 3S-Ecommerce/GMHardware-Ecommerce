import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { MaisVendidos } from "../../mais-vendidos/mais-vendidos";

@Component({
  selector: 'app-apresentacao',
  imports: [MaisVendidos],
  templateUrl: './apresentacao.html',
  styleUrl: './apresentacao.scss',
})
export class Apresentacao {

}
