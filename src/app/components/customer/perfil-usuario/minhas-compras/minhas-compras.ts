import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  compras: any[] = [];
  carregando = false;
  erro = '';

  constructor(
    private orderService: Order,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCompras();
  }

  carregarCompras(): void {
    this.carregando = true;
    this.erro = '';

    this.orderService.listarMinhasCompras().subscribe({
      next: (res) => {
        this.compras = Array.isArray(res) ? res : [];
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar compras:', err);
        this.carregando = false;

        if (err.status === 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
          return;
        }

        this.erro = 'Erro ao carregar suas compras.';
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

    return `http://localhost:8000/storage/${imagem}`;
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