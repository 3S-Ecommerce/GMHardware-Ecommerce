import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../../core/services/category';

@Component({
  selector: 'app-novo-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class NovoCategoria implements OnInit {

  private formBuilder = inject(FormBuilder);
  private readonly apiCategory = inject(Category);
  private router = inject(Router);

  categorias = signal<any[]>([]);

  formCategory = this.formBuilder.group({

    name: ['', [Validators.required, Validators.minLength(2)]]

  });

  ngOnInit(): void {

    this.carregarCategorias();

  }

  carregarCategorias() {

    this.apiCategory.getCategory('').subscribe({

      next: (data) => {

        this.categorias.set(data);

      },
      error: (err) => console.error('Erro ao carregar categorias: ', err)
    });
  }

  onSubmit() {

    if (this.formCategory.invalid) return;

    const formData = new FormData();
    const nameValue = this.formCategory.get('name')?.value;

    if (nameValue) {

      formData.append('name', nameValue);

    }

    this.apiCategory.createCategory(formData).subscribe({

      next: () => {

        alert('Categoria cadastrada com sucesso!');
        this.formCategory.reset();
        this.carregarCategorias();

      },
      error: (err: any) => console.error('Erro ao cadastrar: ', err)
    });
  }

  deletarCategoria(id: string, nome: string) {

    if (confirm(`Tem certeza que deseja excluir a categoria "${nome}"?`)) {

      this.apiCategory.deleteCategory(id).subscribe({

        next: () => {
          
          alert('Categoria deletada com sucesso!');
          this.carregarCategorias();

        },
        error: (err) => {

          console.error('Erro ao deletar:', err);
          alert('Erro ao deletar categoria. Verifique se existem produtos vinculados a ela.');
          
        }
      });
    }
  }
}
