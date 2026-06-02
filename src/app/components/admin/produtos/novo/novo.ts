import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../core/services/category';
import { Product } from '../../../../core/services/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novop',
  imports: [ReactiveFormsModule],
  templateUrl: './novo.html',
  styleUrl: './novo.scss',
})
export class Novop implements OnInit {
  private formBuilder = inject(FormBuilder);
  private readonly apiCategory = inject(Category);
  private readonly apiProduct = inject(Product);
  private router = inject(Router);

  increment = signal<number>(1);
  categorias = signal<any>(null);

  formProduct = this.formBuilder.group({
    name: ['', Validators.required],
    id_category: ['', Validators.required], // Correção: Iniciando com string vazia
    price: ['', Validators.required],
    stock: ['', Validators.required],
    description: ['', Validators.required],
    details: this.formBuilder.array([]),
    id_admin: [1, Validators.required],
    image: [null],
    image_2: [null],
    image_3: [null],
    image_4: [null],
    image_5: [null]
  });

  get detalhesFormArray() {
    return this.formProduct.get('details') as FormArray;
  }

  ngOnInit(): void {
    this.apiCategory.getCategory('').subscribe({
      next: (data) => this.categorias.set(data),
      error: (err) => console.error("Error: ", err)
    });
  }

  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.formProduct.patchValue({ [fieldName]: file });
    }
  }

  onSubmit() {
    if (this.formProduct.invalid) return;

    const form = this.formProduct.value;
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === 'details') {
        // 💡 VOLTANDO PARA O FORMATO ANTIGO: Converte o array em uma string separada por vírgulas
        if (Array.isArray(value)) {
          formData.append('details', value.join(','));
        }
      } else if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value as any);
      }
    });

    this.apiProduct.createProduct(formData).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        this.router.navigate(['/admin']);
      },
      error: (err) => console.error('Error: ', err)
    });
  }

  novoDetalhe() {
    this.detalhesFormArray.push(new FormControl(''));
    this.increment.set(this.increment() + 1);
  }
}