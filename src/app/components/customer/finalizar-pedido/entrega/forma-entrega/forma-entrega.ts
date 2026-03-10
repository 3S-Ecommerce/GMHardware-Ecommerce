import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forma-entrega',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './forma-entrega.html',
  styleUrl: './forma-entrega.scss',
})
export class FormaEntrega {
  @Input('variante') variante: string = 'entrega';

}
