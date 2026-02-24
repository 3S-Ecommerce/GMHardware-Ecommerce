import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forma-entrega',
  imports: [ CommonModule ],
  templateUrl: './forma-entrega.html',
  styleUrl: './forma-entrega.scss',
})
export class FormaEntrega {
  @Input('variante') variante: string = 'entrega';

}
