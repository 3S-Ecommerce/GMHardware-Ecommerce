import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {

  private fb = inject(FormBuilder);
  private authService = inject(Auth);

  formRegister = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  onSubmit() {

    const form = this.formRegister.value;

    if (form.password !== form.confirmPassword) {
      alert('Senhas não coincidem');
      return;
    }

    this.authService.register({
      name: 'Arthur',
      email: form.email,
      password: form.password
    }).subscribe({
      next: (res: any) => {
        console.log('SUCESSO', res);
        alert('Cadastrado com sucesso!');
      },
      error: (err) => {
        console.error('ERRO', err);
      }
    });
  }
}