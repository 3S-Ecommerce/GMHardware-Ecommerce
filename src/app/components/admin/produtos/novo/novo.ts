import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../core/services/category';
import { Product } from '../../../../core/services/product';
import { text } from 'node:stream/consumers';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  increment = signal<number>(1);
  categorias = signal<any>(null);
  formProduct = this.formBuilder.group({
    name: ['', Validators.required],
    id_category: [Number, Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    description: ['', Validators.required],
    details: this.formBuilder.array([]),
    id_admin: [1, Validators.required],
    image: [File]
  })

  get detalhesFormArray() {
    return this.formProduct.get('details') as FormArray;
  }

  ngOnInit(): void {
    this.apiCategory.getCategory('').subscribe({
      next: (data) => {
        this.categorias.set(data);
       // console.log(this.categorias());
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
    const form = this.formProduct.value;
    const formData = new FormData;

    Object.entries(form).forEach(([key, value]) => {
      if(key === 'details'){
        formData.append('details', JSON.stringify(value))
      }
      if (value !== null && value !== undefined && value !== '')
      {
        formData.append(key, value as any);
      }
    })
    console.log(formData)
    this.apiProduct.createProduct(formData).subscribe({
      next: (res) => {
        console.log (JSON.stringify(form.details))
        alert('Produto castrado com sucesso!')
        this.router.navigate(['/admin'])
      },
      error: (err) => {
        console.error('Error: ', err)
      }
    })
  }

  novoDetalhe(){
    this.detalhesFormArray.push(new FormControl(''));
    this.increment.set(this.increment() + 1)
  }
  // novoDetalhe(){
  //   const div = document.getElementById('div-details');
  //   const novoDetalhe = document.createElement('input');
  //   novoDetalhe.setAttribute('type', 'text');
  //   novoDetalhe.classList.add('details')
  //   novoDetalhe.setAttribute('id', 'details'+this.increment())
  //   novoDetalhe.setAttribute("formControlName", 'details'+this.increment());
  //   this.increment.set(this.increment() + 1)
  //   div?.appendChild(novoDetalhe);
  //   console.log('teste')
  // }

}