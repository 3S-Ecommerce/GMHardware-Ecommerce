import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderService } from '../../../core/services/header-service';
import { Prediosgerais } from '../../prediosgerais/prediosgerais';

@Component({
  selector: 'app-predios',
  imports: [ Prediosgerais ],
  templateUrl: './predios.html',
  styleUrl: './predios.scss',
})
export class Predios {

  constructor(private headerService: HeaderService){}

  ngOnInit(): void {
    this.headerService.setTitulo('REVISAR PENDENCIAS')
  }
}
