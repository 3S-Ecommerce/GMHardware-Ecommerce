import { Component, Input } from '@angular/core';
import { HeaderService } from '../../core/services/header-service';

@Component({
  selector: 'app-header',
  imports: [  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(public headerService: HeaderService){}
}
