import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Adicionado RouterLink
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // Importe o RouterLink aqui
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  // O formulário deve ter os mesmos nomes do formControlName no HTML
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

        // Salvamos o token e os dados do usuário
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        alert('Bem-vindo de volta, ' + res.user.name);

        // Redireciona para onde você desejar (ex: home)
        this.router.navigate(['/inicio']);
      },
      error: (err: any) => {
        console.error('ERRO LOGIN:', err.error);
        alert('E-mail ou senha incorretos.');
      }
    });
  }
}
