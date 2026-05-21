import { Component, inject, signal } from '@angular/core';
import { Prediosgerais } from '../../prediosgerais/prediosgerais';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-escolher-predio',
  imports: [ Prediosgerais ],
  templateUrl: './escolher-predio.html',
  styleUrl: './escolher-predio.scss',
})
export class EscolherPredio {
  private route = inject(ActivatedRoute);
  rota = signal<string>('');
  constructor(route: ActivatedRoute){
    this.rota.set(this.route.snapshot.params['data'])
  }

  
}

  