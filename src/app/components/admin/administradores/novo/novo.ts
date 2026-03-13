import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { Admin } from '../../../../core/services/admin';

@Component({
  selector: 'app-novo',
  imports: [ReactiveFormsModule],
  templateUrl: './novo.html',
  styleUrl: './novo.scss',
})
export class Novo {
  private readonly apiAdmin = inject(Admin);
  private formBuilder = inject(FormBuilder);

  formAdmin = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
    passwordsd: ['', Validators.required],
    phone_number: [''],
    document: ['', Validators.required],
    active: ['', Validators.required || true]
  }
  )
  onSubmit() {
    const formData = new FormData;
    const admin = this.formAdmin.value;
    if(admin.password !== admin.passwordsd){
      return alert("As senhas não coincidem");
    }

    Object.entries(this.formAdmin.value).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as any);
      }
    });
    this.apiAdmin.createAdmin(formData).subscribe({
      next: (res) => {
        alert("Administrador cadastrado com sucesso!");
        this.formAdmin.reset();
      },
      error: (err) => {
        console.error('Error: ', err);
        alert(err)
      }
    })
  }
}