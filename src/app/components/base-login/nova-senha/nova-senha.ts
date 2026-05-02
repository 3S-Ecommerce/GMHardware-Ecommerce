import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-nova-senha',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nova-senha.html',
  styleUrl: './nova-senha.scss',
})
export class NovaSenha {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  formReset = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    old_password: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', [Validators.required]]
  });

  onReset() {
    if (this.formReset.invalid) return;

    const data = this.formReset.value;

    if (data.password !== data.password_confirmation) {
      alert('As novas senhas não coincidem!');
      return;
    }

    this.authService.updatePassword(data).subscribe({
      next: (res: any) => {
        alert('Senha alterada com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('ERRO:', err.error);
        alert(err.error.error || 'Erro ao alterar senha. Verifique os dados.');
      }
    });
  }
}
