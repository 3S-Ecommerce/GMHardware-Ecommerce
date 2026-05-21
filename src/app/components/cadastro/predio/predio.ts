import { Component, inject, signal,  } from '@angular/core';
import { HeaderService } from '../../../core/services/header-service';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Predios } from '../../../core/services/predios';
import { LoadingEnvio } from '../../loading-envio/loading-envio';

@Component({
  selector: 'app-predio',
  imports: [RouterLink, ReactiveFormsModule, LoadingEnvio],
  templateUrl: './predio.html',
  styleUrl: './predio.scss',
})
export class Predio{ 
  private router = inject(Router);
  private api = inject(Predios);
  formBuilder = new FormBuilder;
  formPredio = this.formBuilder.group({
    name: ['', Validators.required],
    contrato: [''],
    endereco: ['', Validators.required]
  })
  submitLoading = signal<boolean>(false);

  constructor(private headerService: HeaderService){}
  
    ngOnInit(): void {
      this.headerService.setTitulo('CADASTRO PRÉDIO')
    }

    onSubmit(){
      this.submitLoading.set(true)
      const form = this.formPredio.value;
      const formData = new FormData;

      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== ''){
          formData.append(key, value as any);
        }
      })
      
      this.api.createPredio(formData).subscribe({
        next: (data) => {
          alert("Predio cadastrado com sucesso! ");
          this.submitLoading.set(false);
          this.router.navigate(['/cadastro/elevador', { id: data}])
        },
        error: (err) => {
          console.error('Error: ', err);
          this.submitLoading.set(false);
        }
      })
    }
}
