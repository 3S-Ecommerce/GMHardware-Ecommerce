import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  imports: [DatePipe, ReactiveFormsModule, RouterLink], // Limpo e sem o módulo com ɵ
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.scss',
})
export class PerfilUsuario implements OnInit {
  public authService = inject(Auth);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  userLocal = signal<any>(null);
  isEditing = false;
  formPerfil!: FormGroup;

  ngOnInit(): void {
    // 1. Inicializa o formulário com todos os campos mapeados na Migration
    this.formPerfil = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      document: ['', [Validators.required, Validators.minLength(11)]],
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      password: ['']
    });

    // 2. Tenta capturar os dados apenas no lado do cliente (Navegador)
    if (typeof window !== 'undefined') {
      const storageUser = localStorage.getItem('user');
      console.log('CONTEÚDO DO LOCALSTORAGE NO INIT:', storageUser);

      if (storageUser) {
        const parsed = JSON.parse(storageUser);
        this.userLocal.set(parsed);
        
        if (!this.authService.currentUser()) {
          this.authService.currentUser.set(parsed);
        }

        // Força o preenchimento inicial dos dados salvos
        this.preencherCamposFormulario(parsed);
      }
    }
  }

  preencherCamposFormulario(dados: any) {
    this.formPerfil.patchValue({
      name: dados.name,
      email: dados.email,
      document: dados.document || '',
      phone_number: dados.phone_number || '',
      address: dados.address || '',
      password: ''
    });
  }

  alternarEdicao() {
    this.isEditing = !this.isEditing;
    
    // Recarrega os dados antigos ao alternar entre ler e editar
    const dados = this.userLocal();
    if (dados) {
      this.preencherCamposFormulario(dados);
    }
  }

  salvarAlteracoes() {
    if (this.formPerfil.invalid || !this.userLocal()) return;

    const formValues = this.formPerfil.value;
    
    // Configura o FormData com o spoofing de método PUT para o Laravel Resource
    const formData = new FormData();
    formData.append('_method', 'PUT'); 
    formData.append('name', formValues.name);
    formData.append('email', formValues.email);
    formData.append('document', formValues.document);
    formData.append('phone_number', formValues.phone_number);
    formData.append('address', formValues.address);
    
    if (formValues.password) {
      formData.append('password', formValues.password);
    }

    const userId = String(this.userLocal().id);
    console.log('Enviando requisição de update para ID:', userId);

    this.authService.updateUser(formData, userId).subscribe({
      next: (usuarioAtualizado: any) => {
        alert('Perfil updated com sucesso!');
        
        if (typeof window !== 'undefined') {
          const tokenAtual = localStorage.getItem('token') || '';
          this.authService.setSession(tokenAtual, usuarioAtualizado);
          this.userLocal.set(usuarioAtualizado);
        }
        
        this.isEditing = false;
      },
      error: (err) => {
        console.error('ERRO RETORNADO PELA API LARAVEL:', err);
        alert('Falha ao atualizar dados. Veja o log do console.');
      }
    });
  }

  fazerLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}