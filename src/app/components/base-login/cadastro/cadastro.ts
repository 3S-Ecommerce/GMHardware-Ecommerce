import { Component, inject, OnInit, signal } from '@angular/core';
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
export class Cadastro implements OnInit {

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
    phone_number: ['', [Validators.required, Validators.minLength(10)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required]

  });

  ngOnInit(): void {
    this.formRegister.get('document')?.valueChanges.subscribe(valor => {
      if (!valor) return

      let document = valor.replace(/\D/g, '');
      if (document.length > 14) {
        document = document.substring(0, 14)
      }
      if (document.length <= 11) {
        const documentoFormatado = document
          .replace(/^(\d{3})(\d)/, '$1.$2')
          .replace(/^(\d{3}).(\d{3})(\d)/, '$1.$2.$3')
          .replace(/^(\d{3}).(\d{3}).(\d{3})(\d)/, '$1.$2.$3-$4')
        this.formRegister.get('document')?.patchValue(documentoFormatado, { emitEvent: false })
      } else if (document.length > 11) {
        const documentoFormatado = document
          .replace(/^(\d{2})(\d)/, '$1.$2')
          .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
          .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
          .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')
        this.formRegister.get('document')?.patchValue(documentoFormatado, { emitEvent: false })

      }


    })
    this.formRegister.get('phone_number')?.valueChanges.subscribe(valor => {
      if (!valor) return

      let phone = valor.replace(/\D/g, '');

      if (phone.length > 11)
        phone = phone.substring(0,11);

      const telefoneFormatado = phone
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/^(\(\d{2}\)\s(\d{5}))(\d{4})/, '$1-$2')

      this.formRegister.get('phone_number')?.patchValue(telefoneFormatado, { emitEvent: false })
      console.log(telefoneFormatado)
    })

  }

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
      document: form.document?.replace(/\D/g, ''),
      phone_number: form.phone_number?.replace(/\D/g, ''),
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