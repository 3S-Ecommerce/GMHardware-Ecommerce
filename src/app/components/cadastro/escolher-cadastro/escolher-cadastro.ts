import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderService } from '../../../core/services/header-service';

@Component({
  selector: 'app-escolher-cadastro',
  imports: [ RouterLink ],
  templateUrl: './escolher-cadastro.html',
  styleUrl: './escolher-cadastro.scss',
})
export class EscolherCadastro implements OnInit {

  constructor(private headerService: HeaderService){}

  ngOnInit(): void {
    this.headerService.setTitulo('CADASTRO')
  }
}
