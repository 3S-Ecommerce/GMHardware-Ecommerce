import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onLogin() {
    if (this.formLogin.invalid) return;

    const data = this.formLogin.value;

    this.authService.login(data).subscribe({
      next: (res: any) => {
        console.log('LOGIN SUCESSO', res);

        // 1. Salvamos o token e os dados do usuário
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        alert('Bem-vindo de volta, ' + res.user.name);

        // 2. Lógica de Redirecionamento (MUDANÇA AQUI)
        // Verificamos o 'tipo_usuario' que definimos no AuthController.php
        if (res.tipo_usuario === 'admin') {
          console.log('Redirecionando para área Admin...');
          this.router.navigate(['/admin-dashboard']); // 👈 Coloque o nome da sua rota de admin aqui
        } else {
          console.log('Redirecionando para Home...');
          this.router.navigate(['/inicio']); // 👈 Rota do usuário normal
        }
      },
      error: (err: any) => {
        console.error('ERRO LOGIN:', err.error);
        alert('E-mail ou senha incorretos.');
      }
    });
  }
}
