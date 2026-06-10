import { Component, OnInit, inject, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  orderId: string = '';
  valorPedido: number = 0;

  qrCodeUrl: string = '';
  textoCopiaCola: string = '';

  carregando: boolean = true;
  erro: string = '';

  private readonly phpGeradorUrl = 'https://gmhardware-ecommerce.onrender.com/api/gerador.php';

  ngOnInit(): void {
    // Captura os parâmetros da URL de forma segura
    this.orderId = this.route.snapshot.queryParamMap.get('id_order') || '';
    this.valorPedido = Number(this.route.snapshot.queryParamMap.get('total')) || 0;

    if (!this.orderId || this.orderId === '0') {
      this.erro = 'ID do pedido inválido ou não identificado. Volte ao carrinho.';
      this.carregando = false;
      return;
    }

    // CORREÇÃO CRÍTICA: Só dispara a chamada HTTP se estiver rodando no navegador do cliente.
    // Isso evita que o SSR trave a renderização inicial da página em modo "carregando".
    if (isPlatformBrowser(this.platformId)) {
      this.gerarQrCodePix();
    }
  }

  gerarQrCodePix(): void {
    this.carregando = true;
    this.erro = '';
    this.cdr.detectChanges();

    // A URL final contida no QRCode que aponta para o validador mobile da Cloudflare Pages
    this.textoCopiaCola = `https://gmhardware.pages.dev/validar?id_order=${this.orderId}`;

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
        this.cdr.detectChanges(); // Força o Angular a atualizar a view após a resposta assíncrona
      },
      error: (err) => {
        console.error('Erro ao gerar Pix no PHP:', err);
        this.erro = 'Falha na comunicação com o servidor de pagamentos. Verifique os logs da API.';
        this.carregando = false;
        this.cdr.detectChanges(); // Força o Angular a exibir o estado de erro
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