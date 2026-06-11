import { Component, inject, signal } from '@angular/core';
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
  alterandoSenha = signal<boolean>(false)

  formReset = this.fb.group({

    email: [''],
    // old_password: [''],
    password: [''],
    password_confirmation: ['']

  });

  onReset() {

    this.alterandoSenha.set(true);
    const data = this.formReset.value;
    console.log('Dados sendo enviados:', data);

    this.authService.updatePassword(data).subscribe({

      next: (res: any) => {

        console.log('SUCESSO:', res);
        alert('Senha alterada com sucesso!');
        this.alterandoSenha.set(false);
        this.router.navigate(['/login']);

      },
      error: (err: any) => {

        console.error('ERRO NO BACKEND:', err.error);
        this.alterandoSenha.set(false);
        alert('Erro: ' + (err.error.error || 'Verifique os dados informados.'));
        
      }
    });
  }
}
