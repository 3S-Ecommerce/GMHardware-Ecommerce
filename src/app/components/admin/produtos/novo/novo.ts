import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../../core/services/category';
import { Product } from '../../../../core/services/product';

@Component({
  selector: 'app-novop',
  imports: [ ReactiveFormsModule ],
  templateUrl: './novo.html',
  styleUrl: './novo.scss',
})
export class Novop implements OnInit{
  private formBuilder = inject(FormBuilder);
  private readonly apiCategory = inject(Category);
  private readonly apiProduct = inject(Product);
  categorias = signal<any>(null);
  dados = signal<any>(null);

  ngOnInit(): void {
    this.apiCategory.getCategory('').subscribe({
      next: (data) => {
        this.dados.set(data);
        console.log(this.categorias());
      },
      error: (err) => {

      }
    });
  }

  formProduct = this.formBuilder.group({

  })
  onSubmit(){

  }
}
