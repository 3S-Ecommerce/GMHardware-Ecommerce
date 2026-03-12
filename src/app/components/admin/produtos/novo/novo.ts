import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  formProduct = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    description: ['', Validators.required],
    image: [File]
  })

  ngOnInit(): void {
    this.apiCategory.getCategory('').subscribe({
      next: (data) => {
        this.categorias.set(data);
        console.log(this.categorias());
      },
      error: (err) => {
        console.error("Error: ", err)
      }
    });
  }

  onFileChange(event: any){
    const file = event.target.files[0];
    if (file){
      this.formProduct.patchValue({ image: file })
    }
  }
  onSubmit(){

  }
}
