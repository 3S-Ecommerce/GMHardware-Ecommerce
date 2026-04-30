import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-cadastro',
  standalone: true, // Adicionado caso seu projeto use standalone components
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {

  private fb = inject(FormBuilder);
  private authService = inject(Auth);

  // Mantive os nomes originais para você não precisar mexer no seu HTML
  formRegister = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  });

  onSubmit() {
    if (this.formRegister.invalid) {
      return;
    }

    const form = this.formRegister.value;

    // Verificação local no Angular
    if (form.password !== form.confirmPassword) {
      alert('Senhas não coincidem');
      return;
    }

    // Enviando os dados formatados para o Laravel
    this.authService.register({
      name: 'Arthur', // Nome fixo como estava no seu código
      email: form.email,
      password: form.password,
      // O Laravel exige este nome exato para validar a confirmação:
      password_confirmation: form.confirmPassword
    }).subscribe({
      next: (res: any) => {
        console.log('SUCESSO', res);
        alert('Usuário cadastrado com sucesso!');
      },
      error: (err: any) => {
        console.error('ERRO BACK:', err.error);
        // Exibe os erros de validação do Laravel se houver
        if (err.status === 422) {
          console.table(err.error.errors);
        }
      }
    });
  }
}
