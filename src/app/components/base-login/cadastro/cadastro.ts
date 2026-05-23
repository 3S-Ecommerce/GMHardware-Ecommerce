import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { CommonModule } from '@angular/common'; // 👈 1. Importe aqui

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {

  private fb = inject(FormBuilder);
  private authService = inject(Auth);

  // 1. ADICIONE ESTA VARIÁVEL AQUI
  showModal = false;

  formRegister = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required],
    aceiteTermos: [false, Validators.requiredTrue]
  });

  // 2. ADICIONE ESTE MÉTODO AQUI
  toggleModal() {
    this.showModal = !this.showModal;
  }

  onSubmit() {
    if (this.formRegister.invalid) {
      return;
    }

    const form = this.formRegister.value;

    if (form.password !== form.password_confirmation) {
      alert('Senhas não coincidem');
      return;
    }

    this.authService.register({
      name: 'Arthur',
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation
    }).subscribe({
      next: (res: any) => {
        console.log('SUCESSO', res);
        alert('Usuário cadastrado com sucesso!');
      },
      error: (err: any) => {
        console.error('ERRO BACK:', err.error);
        if (err.status === 422) {
          alert('Erro de validação: ' + JSON.stringify(err.error.errors));
        }
      }
    });
  }
}
