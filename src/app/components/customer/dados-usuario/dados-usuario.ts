import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-dados-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './dados-usuario.html',
  styleUrl: './dados-usuario.scss',
})
export class DadosUsuario implements OnInit {
  public authService = inject(Auth);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  userLocal = signal<any>(null);
  formComplementar!: FormGroup;

  ngOnInit(): void {
    // 1. Inicializa o formulário incluindo o campo 'name'
    this.formComplementar = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      document: ['', [Validators.required, Validators.minLength(11)]],
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      address: ['', [Validators.required, Validators.minLength(10)]]
    });

    // 2. Puxa o usuário recém-cadastrado do localStorage
    if (typeof window !== 'undefined') {
      const storageUser = localStorage.getItem('user');
      if (storageUser) {
        const parsedUser = JSON.parse(storageUser);
        this.userLocal.set(parsedUser);

        // Preenche o campo de nome automaticamente com o valor do registro
        this.formComplementar.patchValue({
          name: parsedUser.name
        });
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  salvarDadosAdicionais() {
    if (this.formComplementar.invalid || !this.userLocal()) return;

    const formValues = this.formComplementar.value;
    const formData = new FormData();

    // Spoofing para o Laravel apiResource entender como PUT
    formData.append('_method', 'PUT');

    // Mantém o e-mail que veio do passo anterior (obrigatório no banco)
    formData.append('email', this.userLocal().email);

    // Envia o nome (atualizado ou mantido) junto com os novos dados
    formData.append('name', formValues.name);
    formData.append('document', formValues.document);
    formData.append('phone_number', formValues.phone_number);
    formData.append('address', formValues.address);

    const userId = String(this.userLocal().id);

    this.authService.updateUser(formData, userId).subscribe({
      next: (usuarioAtualizado: any) => {
        alert('Cadastro finalizado com sucesso! Bem-vindo à GMHardware.');

        if (typeof window !== 'undefined') {
          const tokenAtual = localStorage.getItem('token') || '';
          this.authService.setSession(tokenAtual, usuarioAtualizado);
        }

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao salvar dados adicionais:', err);
        alert('Falha ao salvar dados. Verifique os campos.');
      }
    });
  }
}