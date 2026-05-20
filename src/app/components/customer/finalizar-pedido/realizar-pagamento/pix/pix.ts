import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentService } from '../../../../../core/services/payment';

@Component({
  selector: 'app-pix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pix.html',
  styleUrls: ['./pix.scss']
})
export class PixComponent implements OnInit {

  qrCodeBase64 = '';
  qrCode = '';
  valor = 1.99;

  constructor(
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.gerarPix();
  }

  gerarPix() {
    const pixData = {
      amount: this.valor,
      email: 'teste@test.com'
    };

    this.paymentService.createPix(pixData)
      .subscribe({
        next: (response: any) => {
          console.log('Resposta da API:', response);
          
          this.qrCode = response.qr_code;
          this.qrCodeBase64 = 'data:image/png;base64,' + response.qr_code_base64;
        },
        error: (error: any) => {
          console.error('Erro ao gerar Pix:', error);
        }
      });
  }
}
