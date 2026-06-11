import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef, signal } from '@angular/core';
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
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);
  orderId: string | null = null;
  valorTotal: number = 0;
  carregando: boolean = true;
  processando = signal<boolean>(false);
  cancelado = signal<boolean>(false);
  processado = signal<boolean>(false);
  erro: string = '';
  private readonly apiUrl = 'https://gmhardware-ecommerce.onrender.com/api';

  ngOnInit(){
    this.orderId = this.route.snapshot.queryParamMap.get('id_order');
    if (!this.orderId) {
      this.erro = 'ID do pedido não encontrado na URL.';
      this.carregando = false;
      return;
    }
    if (isPlatformBrowser(this.platformId)) {
      this.buscarDadosPedido();
    }
  }

  buscarDadosPedido(){
    this.carregando = true;
    this.http.get<any>(`${this.apiUrl}/orders-public/${this.orderId}`).subscribe({
      next: (res) => {
        this.valorTotal = res.total_price || 0;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar pedido:', err);
        this.erro = 'Não foi possível carregar os dados deste pedido.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  confirmarPagamento(confirmado: boolean){
    this.processando.update(p => true);
    this.cdr.detectChanges();
    const payload = {id_order: this.orderId, status: confirmado ? 'Pago' : 'Cancelado'};

    this.http.post(`${this.apiUrl}/order/confirmar-pagamento`, payload).subscribe({
      next: () => {
        if(!confirmado)
          this.cancelado.update(p => true)
        this.processando.update(p => false);
        this.processado.update(p => true);
      },
      error: (err) => {
        console.error('Erro ao atualizar status do pedido:', err);
        alert('Erro ao processar a validação. Tente novamente.');
        this.processando.update(p => false);
        this.cdr.detectChanges();
      }
    });
  }
}