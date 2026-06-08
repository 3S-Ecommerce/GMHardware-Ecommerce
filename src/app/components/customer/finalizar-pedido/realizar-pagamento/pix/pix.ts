import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pix.html',
  styleUrl: './pix.scss',
})
export class Pix implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  orderId: string = '';
  valorPedido: number = 0;
  
  qrCodeUrl: string = '';
  textoCopiaCola: string = '';
  
  carregando: boolean = true;
  erro: string = '';

  // Substitua pelo endereço real onde está hospedado o seu arquivo PHP gerador
  private readonly phpGeradorUrl = 'https://gmhardware-ecommerce.onrender.com/api/gerador.php'; 

  ngOnInit(): void {
    this.orderId = this.route.snapshot.queryParamMap.get('id_order') || '';
    this.valorPedido = Number(this.route.snapshot.queryParamMap.get('total')) || 0;

    if (!this.orderId) {
      this.erro = 'ID do pedido não identificado. Volte ao carrinho e tente novamente.';
      this.carregando = false;
      return;
    }

    this.gerarQrCodePix();
  }

  gerarQrCodePix(): void {
    this.carregando = true;
    this.erro = '';

    // A URL final contida no QRCode que aponta para o validador mobile da Cloudflare Pages
    this.textoCopiaCola = `https://gmhardware.pages.dev/finalizar-compra/validar?id_order=${this.orderId}`;

    // Montando o payload clássico de formulário ($_POST["qr"]) que o seu PHP espera
    const formData = new FormData();
    formData.append('qr', this.textoCopiaCola);

    this.http.post<any>(this.phpGeradorUrl, formData).subscribe({
      next: (res) => {
        if (res && res.status === 'success') {
          this.qrCodeUrl = res.url; // A URL gerada pelo Cloudflare R2 vinda do PHP
        } else {
          this.erro = 'Não foi possível gerar o QR Code de pagamento.';
        }
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao gerar Pix no PHP:', err);
        this.erro = 'Falha na comunicação com o servidor de pagamentos.';
        this.carregando = false;
      }
    });
  }

  copiarTexto(event: any): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.select();
    document.execCommand('copy');
    alert('Código de pagamento copiado para a área de transferência!');
  }
} 