import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../core/services/category';
import { Product } from '../../../../core/services/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editarp',
  imports: [ReactiveFormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.scss',
})
export class Editarp {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private readonly apiCategory = inject(Category);
  private readonly apiProduct = inject(Product);
  private router = inject(Router)

  id = signal<string>('')
  increment = signal<number>(1);
  categorias = signal<any>(null);
  dados = signal<any>(null);
  detalhesCadastrados: number = 0;
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
  
  novoDetalhe(){
    this.detalhesFormArray.push(new FormControl(''));
    this.increment.set(this.increment() + 1)
  }

  ngOnInit(): void {
    this.id.set(this.route.snapshot.params['id'])
    this.apiCategory.getCategory('').subscribe({
      next: (data) => {
        this.categorias.set(data);
      },
      error: (err) => {
        console.error("Error: ", err)
      }
    });
    this.apiProduct.getProduct(this.id()).subscribe({
      next: (data) => {
        this.dados.set(data);
        this.detalhesCadastrados = this.dados().details.split(',').length
        for (let i = 0; i < this.detalhesCadastrados; i++){
          this.novoDetalhe();
        }
        this.formProduct.patchValue({
          name: this.dados().name,
          id_category: this.dados().id_category,
          price: this.dados().price,
          stock: this.dados().stock,
          description: this.dados().description,
          details: this.dados().details.split(',')
        })
        
    // console.log(this.dados());
    // console.log(this.dados().image)
    // console.log(this.detalhesCadastrados);
  },
  error: (err) => {
        console.error('Error: ', err)
}
    });
  }

onFileChange(event: any){
  const file = event.target.files[0];
  if (file) {
    this.formProduct.patchValue({ image: file })
  }
  console.log(file)
}

onSubmit(){
  const form = this.formProduct.value;
  const id = String(this.id())
  const formData = new FormData;
  Object.entries(form).forEach(([key, value]) => {
    if (key === 'details') {
      formData.append('details', JSON.stringify(value))
    }
    if (key === 'image'){
      if(value == File){
        formData.append(key, this.dados().image as any)
        // console.log('vazio')
      }else{
        formData.append(key, value as any)
        // console.log('tanao')
      }
    }else if (value !== null && value !== undefined && value !== '') {
      formData.append(key, value as any);
    }
    formData.append('_method', 'PUT' as string);
  })
  this.apiProduct.updateProduct(formData, id).subscribe({
    next: (res) => {
      alert('Produto atualizado com sucesso!')
      this.router.navigate(['/admin'])
    },
    error: (err) => {
      console.error('Error: ', err)
    }
  })
}

}
