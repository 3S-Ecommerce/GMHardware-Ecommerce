import { Component, inject, signal, OnInit} from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Product } from '../../../core/services/product';

@Component({
  selector: 'app-produtos',
  imports: [],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss',
})
export class Produtos implements OnInit{
  private apiProduct = inject(Product);
  products = signal<any>(null);

  ngOnInit(): void {
    this.apiProduct.getProduct('').subscribe({
      next: (data) => {
        this.products.set(data)
      },
      error: (err) => {
        console.error("Error: ", err);
      }
    })
  }
}
