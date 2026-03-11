import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editarp',
  imports: [ ReactiveFormsModule ],
  templateUrl: './editar.html',
  styleUrl: './editar.scss',
})
export class Editarp {
  private formBuilder = inject(FormBuilder);
  dados = signal<any>(null);
  formProduct = this.formBuilder.group({

  })
  onSubmit(){

  }
}
