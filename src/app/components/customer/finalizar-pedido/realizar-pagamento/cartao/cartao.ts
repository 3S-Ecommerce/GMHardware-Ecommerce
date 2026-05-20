import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../../../core/services/auth'; // Ajuste o caminhocheckout.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartao',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cartao.html',
  styleUrl: './cartao.scss',
})
export class Cartao {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  formCartao = this.fb.group({
    nome_titular: ['', Validators.required],
    numero_cartao: ['', [Validators.required, Validators.minLength(16)]],
    vencimento: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]], // Valida 00/00
    cvv: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]]
  });

  onSubmit() {
    if (this.formCartao.invalid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const dados = this.formCartao.value;

    this.authService.saveCard(dados).subscribe({
      next: (res: any) => {
        console.log('Sucesso:', res);
        alert('Compra realizada com sucesso!');
        this.router.navigate(['/dashboard']); // Ou uma tela de sucesso
      },
      error: (err: any) => {
        console.error('Erro ao salvar cartão:', err);
        alert('Erro ao processar pagamento. Verifique os dados.');
      }
    });
  }
}
