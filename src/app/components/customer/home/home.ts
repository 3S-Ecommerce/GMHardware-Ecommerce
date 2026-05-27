import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { RouterOutlet } from "@angular/router";
import { Footer } from '../footer/footer';
import { Title } from '@angular/platform-browser';
//import { Apresentacao } from '../apresentacao/apresentacao';
//import { MaisVendidos } from "../mais-vendidos/mais-vendidos";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ Header, Footer, /*Apresentacao, MaisVendidos,*/ RouterOutlet ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{
  constructor(private title: Title){}
  ngOnInit(): void {
    this.title.setTitle('GMHardware')
  }
}
