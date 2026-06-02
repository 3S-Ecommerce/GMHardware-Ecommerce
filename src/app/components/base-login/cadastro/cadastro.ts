import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  private router = inject(Router);
  showModal = false
  dados = signal<any>([]);

  // Configuração do formulário expandido
  formRegister = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    document: ['', [Validators.required, Validators.minLength(11)]],
    phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required]
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

    // Enviando o payload completo com os novos campos para a sua API
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
        
        // Sincroniza a sessão local do navegador
        this.authService.setSession(res.token, res.user, false);
        
        // Segue a sua mesma lógica de navegação usando o ID do retorno
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error('ERRO BACK:', err.error);
        if (err.status === 422) {
          alert('Erro de validação: ' + JSON.stringify(err.error.errors));
        } else {
          alert('Falha ao processar cadastro no servidor.');
        }
      }
    });
  }
}