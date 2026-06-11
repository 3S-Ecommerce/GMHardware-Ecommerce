import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-endereco',
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './endereco.html',
  styleUrl: './endereco.scss',
})
export class Endereco {

  private formBuilder = inject(FormBuilder);

  formEndereco = this.formBuilder.group({

    cep: ['', Validators.required],
    rua: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: [''],
    info: [''],
    recebedor: ['', Validators.required],
    cpf: ['', Validators.required]
    
  })

}
