import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  Inject,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CheckoutService, PaymentMethod } from '../../../../core/services/checkout.service';
import {
  CartaoService,
  Cartao,
  CartaoPayload
} from '../../../../core/services/cartao';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.scss',
})
export class Pagamento {
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private cartaoService = inject(CartaoService);
  private cdr = inject(ChangeDetectorRef);

  cartoes: Cartao[] = [];
  cartaoSelecionado: Cartao | null = null;

  mostrarCartoes = false;
  mostrarFormularioCartao = false;

  carregandoCartoes = false;
  salvandoCartao = false;
  erroCartao = '';

  novoCartao: CartaoPayload = {
    nome_titular: '',
    numero_cartao: '',
    vencimento: '',
    cvv: '',
    cpf: ''
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      setTimeout(() => {
        this.carregarCartoes();
      }, 0);
    });
  }

  carregarCartoes(): void {
    this.carregandoCartoes = true;
    this.erroCartao = '';

    this.cartaoService.listar().subscribe({
      next: (res) => {
        this.cartoes = res || [];

        const cartaoPadrao = this.cartoes.find(cartao => {
          return cartao.is_default === true || cartao.is_default === 1;
        });

        this.cartaoSelecionado = cartaoPadrao || this.cartoes[0] || null;

        if (this.cartaoSelecionado && isPlatformBrowser(this.platformId)) {
          localStorage.setItem(
            'cartaoSelecionado',
            JSON.stringify(this.cartaoSelecionado)
          );
        }

        this.carregandoCartoes = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);

        this.carregandoCartoes = false;

        if (err.status === 401) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
          }

          this.router.navigate(['/login']);
          return;
        }

        this.erroCartao = 'Erro ao carregar cartões.';
        this.cdr.detectChanges();
      }
    });
  }

  selecionarPagamento(metodo: PaymentMethod): void {
    this.checkoutService.setPaymentMethod(metodo);

    if (metodo === 'pix') {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('cartaoSelecionado');
      }

      this.router.navigate(['/finalizar-compra/revisar']);
      return;
    }

    this.mostrarCartoes = true;

    if (this.cartoes.length === 0) {
      this.mostrarFormularioCartao = true;
    }

    this.cdr.detectChanges();
  }

  selecionarCartao(cartao: Cartao): void {
    this.cartaoSelecionado = cartao;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        'cartaoSelecionado',
        JSON.stringify(cartao)
      );
    }

    this.cdr.detectChanges();
  }

  definirCartaoPadrao(id: number): void {
    this.cartaoService.definirPadrao(id).subscribe({
      next: () => {
        this.cartoes.forEach(cartao => {
          cartao.is_default = cartao.id === id ? 1 : 0;
        });

        const novoPadrao = this.cartoes.find(cartao => cartao.id === id);

        if (novoPadrao) {
          this.selecionarCartao(novoPadrao);
        }

        alert('Cartão definido como padrão!');
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao definir cartão padrão.');
      }
    });
  }

  abrirFormularioCartao(): void {
    this.mostrarFormularioCartao = true;

    this.novoCartao = {
      nome_titular: '',
      numero_cartao: '',
      vencimento: '',
      cvv: '',
      cpf: ''
    };

    this.cdr.detectChanges();
  }

  cancelarFormularioCartao(): void {
    this.mostrarFormularioCartao = false;

    this.novoCartao = {
      nome_titular: '',
      numero_cartao: '',
      vencimento: '',
      cvv: '',
      cpf: ''
    };

    this.cdr.detectChanges();
  }

  salvarNovoCartao(): void {
    if (!this.formularioCartaoValido()) {
      alert('Preencha todos os campos do cartão corretamente.');
      return;
    }

    this.salvandoCartao = true;
    this.cdr.detectChanges();

    this.cartaoService.salvarCartao(this.novoCartao).subscribe({
      next: (res) => {
        this.cartaoSelecionado = res;

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(
            'cartaoSelecionado',
            JSON.stringify(res)
          );
        }

        this.salvandoCartao = false;
        this.mostrarFormularioCartao = false;

        this.novoCartao = {
          nome_titular: '',
          numero_cartao: '',
          vencimento: '',
          cvv: '',
          cpf: ''
        };

        this.carregarCartoes();

        alert('Cartão cadastrado com sucesso!');
      },
      error: (err) => {
        console.error(err);

        this.salvandoCartao = false;
        this.cdr.detectChanges();

        alert('Erro ao cadastrar cartão.');
      }
    });
  }

  continuarComCartao(): void {
    if (!this.cartaoSelecionado) {
      this.mostrarCartoes = true;
      this.mostrarFormularioCartao = true;
      this.cdr.detectChanges();

      alert('Selecione ou cadastre um cartão antes de continuar.');
      return;
    }

    this.checkoutService.setPaymentMethod('cartao');

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        'cartaoSelecionado',
        JSON.stringify(this.cartaoSelecionado)
      );
    }

    this.router.navigate(['/finalizar-compra/revisar']);
  }

  formatarNumeroCartao(numero: string): string {
    if (!numero) return '';

    return '**** **** **** ' + numero.slice(-4);
  }

  private formularioCartaoValido(): boolean {
    return (
      this.novoCartao.nome_titular.trim().length > 0 &&
      this.novoCartao.numero_cartao.trim().length >= 13 &&
      this.novoCartao.vencimento.trim().length === 5 &&
      this.novoCartao.cvv.trim().length >= 3 &&
      this.novoCartao.cpf.trim().length >= 11
    );
  }
}