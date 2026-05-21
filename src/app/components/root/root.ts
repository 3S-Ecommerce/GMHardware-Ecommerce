import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, Header, Footer ],
  templateUrl: './root.html',
  styleUrl: './root.scss',
})
export class Root {
}
