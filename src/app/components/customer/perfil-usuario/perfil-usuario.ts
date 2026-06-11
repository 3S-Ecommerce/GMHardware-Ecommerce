import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  imports: [DatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.scss',
})
export class PerfilUsuario implements OnInit, OnDestroy {
  showFiller = false;
  public authService = inject(Auth);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  userLocal = signal<any>(null);
  isEditing = false;
  formPerfil!: FormGroup;

  ngOnInit(){
    this.formPerfil = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      document: ['', [Validators.required, Validators.minLength(11)]],
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      password: ['']
    });

    if (typeof window !== 'undefined') {
      const storageUser = localStorage.getItem('user');
      if (storageUser) {
        const parsed = JSON.parse(storageUser);
        this.userLocal.set(parsed);
        if (!this.authService.currentUser()) { this.authService.currentUser.set(parsed); }
        this.preencherCamposFormulario(parsed);
      } else {
        this.userLocal.set(null);
      }
    }
  }

  ngOnDestroy(){
    this.userLocal.update(p => null);
  }

  preencherCamposFormulario(dados: any){
    this.formPerfil.patchValue({
      name: dados.name,
      email: dados.email,
      document: dados.document || '',
      phone_number: dados.phone_number || '',
      address: dados.address || '',
      password: ''
    });
  }

  alternarEdicao(){
    this.isEditing = !this.isEditing;
    const dados = this.userLocal();
    if (dados) { this.preencherCamposFormulario(dados); }
  }

  salvarAlteracoes(){
    if (this.formPerfil.invalid || !this.userLocal()) { return; }
    const formValues = this.formPerfil.value;
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', formValues.name);
    formData.append('email', formValues.email);
    formData.append('document', formValues.document);
    formData.append('phone_number', formValues.phone_number);
    formData.append('address', formValues.address);
    if (formValues.password) { formData.append('password', formValues.password); }
    const userId = String(this.userLocal().id);

    this.authService.updateUser(formData, userId).subscribe({
      next: (usuarioAtualizado: any) => {
        alert('Perfil updated com sucesso!');
        if (typeof window !== 'undefined') {
          const tokenAtual = localStorage.getItem('token') || '';
          this.authService.setSession(tokenAtual, usuarioAtualizado, false);
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

  fazerLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}