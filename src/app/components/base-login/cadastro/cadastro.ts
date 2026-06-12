import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {

  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  showModal = signal<boolean>(false)
  dados = signal<any>([]);
  cadastrando = signal<boolean>(false)

  formRegister = this.fb.group({

    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    document: ['', [Validators.required, Validators.minLength(11)]],
    phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required]

  });

  toggleModal() {

    this.showModal.update(p => !p);

  }

  onSubmit() {

    this.cadastrando.set(true);

    if (this.formRegister.invalid) {

      return;

    }

    const form = this.formRegister.value;

    if (form.password !== form.password_confirmation) {

      this.cadastrando.set(false);
      alert('Senhas não coincidem');
      return;

    }

    this.authService.register({
      name: form.name,
      email: form.email,
      document: form.document,
      phone_number: form.phone_number,
      address: form.address,
      password: form.password,
      password_confirmation: form.password_confirmation
    }).subscribe({

      next: (res: any) => {

        console.log('SUCESSO', res);
        alert('Usuário cadastrado com sucesso!');
        this.dados.set(res);
        this.authService.setSession(res.token, res.user, false);
        this.cadastrando.set(false);
        this.router.navigate(['/']);

      },
      error: (err: any) => {

        console.error('ERRO BACK:', err.error);
        if (err.status === 422) {

          alert('Erro de validação: ' + JSON.stringify(err.error.errors));

        } else {

          alert('Falha ao processar cadastro no servidor.');

        }

        this.cadastrando.set(false);
      }
    });
  }
}