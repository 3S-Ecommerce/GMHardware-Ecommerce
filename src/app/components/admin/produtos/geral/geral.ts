import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../../core/services/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-geralp',
  imports: [ NgOptimizedImage, DatePipe, RouterLink],
  templateUrl: './geral.html',
  styleUrl: './geral.scss',
})
export class Geralp {

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
