import { Component, inject, signal } from '@angular/core';
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
  logando = signal<boolean>(false);

  formLogin = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]

  });

  onLogin() {

    this.logando.set(true);

    if (this.formLogin.invalid) return;

    const data = this.formLogin.value;

    this.authService.login(data).subscribe({

      next: (res: any) => {

        console.log('LOGIN SUCESSO', res);
        this.authService.setSession(res.token, res.user, res.admin);
        alert('Bem-vindo de volta, ' + res.user.name);
        this.logando.set(false);

        if (res.admin === true) {

          console.log('Redirecionando para área Admin...');
          this.router.navigate(['/admin']);

        } else {

          console.log('Redirecionando para Home...');
          this.router.navigate(['/inicio']);

        }
      },
      error: (err: any) => {

        console.error('ERRO LOGIN:', err.error);
        this.logando.set(false);
        alert('E-mail ou senha incorretos.');
        
      }
    });
  }
}
