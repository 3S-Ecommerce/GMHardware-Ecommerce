import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../core/services/product';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produto',
  imports: [ ReactiveFormsModule ],
  templateUrl: './cadastro-produto.html',
  styleUrl: './cadastro-produto.scss',
})
export class CadastroProduto {

  private api = inject(Product);
  private formbuilder = inject(FormBuilder);
  enviando = signal(false)

  productForm = this.formbuilder.group({

    name: ['', Validators.required],
    price: ['', Validators.required],
    id_admin: ['', Validators.required],
    id_category: ['', Validators.required],
    stock: [0, Validators.required],
    description: ['', Validators.required],
    details: [''],
    image: [File] 

  })

  onFileChange(event: any){

    const file = event.target.files[0];

    if (file){

      this.productForm.patchValue({ image: file })

    }
  }

  onSubmit(){

    this.enviando.set(true)
    const formData = new FormData
    Object.entries(this.productForm.value).forEach(([key, value]) =>{

      if (value !== null){

        formData.append(key, value as any);

      }
    });

    this.api.createProduct(formData).subscribe({

      next: (res) => {

        this.enviando.set(false);
        this.productForm.reset();
        alert("Produto cadastrado com sucesso!")

      },
      error: (err) => {

        this.enviando.set(false)
        console.error("Error: ", err  )
        
      }
    })
  }
}