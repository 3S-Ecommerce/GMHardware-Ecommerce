import { Component, OnInit, afterNextRender, Inject, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Order } from '../../../../core/services/order';

@Component({
  selector: 'app-minhas-compras',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './minhas-compras.html',
  styleUrls: ['./minhas-compras.scss']
})
export class MinhasComprasComponent implements OnInit {
  compras = signal<any[]>([])
  carregando = false;
  erro = '';
  private orderService = inject(Order)
  private router = inject(Router)

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      setTimeout(() => {
        this.carregarCompras();
      }, 0);
    });
  }

  ngOnInit(): void {}

  carregarCompras(): void {
    this.carregando = true;
    this.erro = '';

    this.orderService.listarMinhasCompras().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.compras.set(Array.isArray(res) ? res : []);
          this.carregando = false;
        }, 10);
        console.log(this.compras())
      },
      error: (err) => {
        console.error('Erro ao carregar compras:', err);

        setTimeout(() => {
          this.carregando = false;

          if (err.status === 401) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.clear();
            }

            this.router.navigate(['/login']);
            return;
          }

          this.erro = 'Erro ao carregar suas compras.';
        }, 10);
      }
    });
  }

  formatarData(data: string): string {
    if (!data) return '';

    return new Date(data).toLocaleDateString('pt-BR');
  }

  formatarValor(valor: any): string {
    const numero = Number(valor || 0);

    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  getImagemProduto(item: any): string {
    const imagem = item?.product?.image;

    if (!imagem) {
      return '/assets/placeholder.png';
    }

    if (imagem.startsWith('http')) {
      return imagem;
    }

    return `https://pub-38889ba16be84990a69dfca8fd011b2c.r2.dev/${imagem}`;
  }

  getNomeProduto(item: any): string {
    return item?.product?.name || 'Produto não encontrado';
  }

  getEndereco(compra: any): string {
    return compra?.endereco_snapshot || 'Endereço não informado';
  }

  getPagamento(compra: any): string {
    if (!compra?.payment_method) {
      return 'Pagamento não informado';
    }

    if (compra.payment_method === 'Cartão de Crédito' && compra.card_last_digits) {
      return `Cartão de Crédito - final ${compra.card_last_digits}`;
    }

    return compra.payment_method;
  }
}