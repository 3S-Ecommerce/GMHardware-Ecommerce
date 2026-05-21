import { Component, Output, OnInit, inject, Inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../core/services/header-service';
import { Prediosgerais } from '../prediosgerais/prediosgerais';
import { Predios } from '../../core/services/predios';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-inicio',
  imports: [ Prediosgerais ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
  api = inject(Predios);
  constructor(private headerService: HeaderService){}

  ngOnInit(): void {
    this.headerService.setTitulo('INÍCIO');
  }
}
