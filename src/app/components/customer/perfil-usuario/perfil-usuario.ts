import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  imports: [DatePipe, ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.scss',
})
export class PerfilUsuario implements OnInit {
  public authService = inject(Auth);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // Criamos um sinal local para gerenciar o estado da tela de forma segura
  userLocal = signal<any>(null);
  isEditing = false;
  formPerfil!: FormGroup;

  ngOnInit(): void {
    // 1. Inicializa o formulário vazio para evitar quebras no HTML
    this.formPerfil = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });

    // 2. Tenta capturar os dados apenas no lado do cliente (Navegador)
    if (typeof window !== 'undefined') {
      const storageUser = localStorage.getItem('user');
      console.log('CONTEÚDO DO LOCALSTORAGE NO INIT:', storageUser);

      if (storageUser) {
        const parsed = JSON.parse(storageUser);
        this.userLocal.set(parsed);
        // Garante que o serviço global também fique atualizado
        if (!this.authService.currentUser()) {
          this.authService.currentUser.set(parsed);
        }

        // Força o preenchimento inicial dos dados salvos
        this.formPerfil.patchValue({
          name: this.userLocal().name,
          email: this.userLocal().email,
          password: ''
        });
      }
    }
  }

  alternarEdicao() {
    this.isEditing = !this.isEditing;
    
    // Recarrega os dados antigos ao alternar entre ler e editar
    const dados = this.userLocal();
    if (dados) {
      this.formPerfil.patchValue({
        name: dados.name,
        email: dados.email,
        password: ''
      });
    }
  }

  salvarAlteracoes() {
    if (this.formPerfil.invalid || !this.userLocal()) return;

    const formValues = this.formPerfil.value;
    
    // Importante: Para o Laravel aceitar multipart/form-data via PUT, usamos POST com spoofing
    const formData = new FormData();
    formData.append('_method', 'PUT'); 
    formData.append('name', formValues.name);
    formData.append('email', formValues.email);
    
    if (formValues.password) {
      formData.append('password', formValues.password);
    }

    const userId = String(this.userLocal().id);

    console.log('Enviando requisição de update para ID:', userId);

    this.authService.updateUser(formData, userId).subscribe({
      next: (usuarioAtualizado: any) => {
        alert('Perfil atualizado com sucesso!');
        
        if (typeof window !== 'undefined') {
          const tokenAtual = localStorage.getItem('token') || '';
          // Atualiza localStorage e Signals do sistema
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