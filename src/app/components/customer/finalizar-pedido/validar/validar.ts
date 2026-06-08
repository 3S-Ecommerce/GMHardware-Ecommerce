import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './validar.html',
  styleUrl: './validar.scss',
})
export class Validar implements OnInit {
  // Injeções de Dependência modernas usando o inject()
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  orderId: string | null = null;
  valorTotal: number = 0;
  carregando: boolean = true;
  processando: boolean = false;
  erro: string = '';

  // Endpoint base da sua API Laravel no Render
  private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api';

  ngOnInit(): void {
    // Captura o 'id_order' vindo dos parâmetros de query da URL (?id_order=XX)
    this.orderId = this.route.snapshot.queryParamMap.get('id_order');

    if (!this.orderId) {
      this.erro = 'ID do pedido não encontrado na URL.';
      this.carregando = false;
      return;
    }

    // SSR Guard: Roda a busca HTTP apenas no navegador do cliente
    if (isPlatformBrowser(this.platformId)) {
      this.buscarDadosPedido();
    }
  }

  buscarDadosPedido(): void {
    this.carregando = true;

    // Busca os detalhes do pedido para exibir o valor real na tela do mobile
    this.http.get<any>(`${this.apiUrl}/order/${this.orderId}`).subscribe({
      next: (res) => {
        // Mapeia o preço total baseando-se no retorno do seu checkout do Laravel
        this.valorTotal = res.total_price || res.order?.total_price || 0;
        this.carregando = false;
        this.cdr.detectChanges(); // Força a renderização segura do HTML
      },
      error: (err) => {
        console.error('Erro ao buscar pedido:', err);
        this.erro = 'Não foi possível carregar os dados deste pedido. Verifique se ele existe.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  confirmarPagamento(confirmado: boolean): void {
    this.processando = true;
    this.cdr.detectChanges();

    const payload = {
      id_order: this.orderId,
      status: confirmado ? 'Pago' : 'Cancelado'
    };

    // Dispara a atualização de status para o banco via API do Laravel
    this.http.post(`${this.apiUrl}/order/confirmar-pagamento`, payload).subscribe({
      next: () => {
        alert(confirmado ? 'Pagamento confirmado com sucesso!' : 'Pedido cancelado.');
        this.router.navigate(['/']); // Redireciona o usuário para a Home ou tela de sucesso
      },
      error: (err) => {
        console.error('Erro ao atualizar status do pedido:', err);
        alert('Erro ao processar a validação. Tente novamente.');
        this.processando = false;
        this.cdr.detectChanges();
      }
    });
  }
}