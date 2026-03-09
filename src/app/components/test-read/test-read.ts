import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Product } from '../../core/services/product';
import { Category } from '../../core/services/category';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-read',
  standalone: true,
  imports: [Header, Footer, ReactiveFormsModule],
  templateUrl: './test-read.html',
  styleUrl: './test-read.scss',
})
export class TestRead {
  apiProduct = inject(Product);
  apiCategory = inject(Category);
  private formBuilder = inject(FormBuilder);

  formId = this.formBuilder.group({
    id: [''],
    opcao: ['', Validators.required],
  })

  onSubmit() {
    const formData = new FormData;
    const id = this.formId.value.id;

    Object.entries(this.formId.value).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as string)
      }
    })
    switch (this.formId.value.opcao) {
      case ('category'):
        this.apiCategory.getCategory(`${id}`).subscribe({
          next: (data) => {
            console.log(data)
          },
          error: (err) => {
            console.error("error: ", err)
          }
        })
        break
      case ('product'):

        this.apiProduct.getProduct(`${id}`).subscribe({
          next: (data) => {
            console.log(data)
          },
          error: (err) => {
            console.error("error: ", err)
          }
        })
    }

  }


}
