import { afterNextRender, Component, computed, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router'; // Adicionado Router e ActivatedRoute
import { Cart } from '../../../../core/services/cart';
import { CheckoutService } from '../../../../core/services/checkout.service'; // Adicionado o CheckoutService
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-revisar',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './revisar.html',
  styleUrl: './revisar.scss',
})
export class Revisar {
  private cart = inject(Cart);
  private checkoutService = inject(CheckoutService); // Injetando o serviço de checkout
  private router = inject(Router); // Injetando o router para navegar
  private route = inject(ActivatedRoute); // Injetando a rota ativa para navegação relativa

  constructor() {
    afterNextRender(() => {
      this.cart.iniciar()
    })
  }

  produtos = computed(() => {
    return this.cart.items()
  })

  valorTotal = computed(() => {
    return this.cart.valorTotal()
  })

  // Esta variável vai mostrar o nome do pagamento no seu HTML
  metodoPagamento = computed(() => {
    return this.checkoutService.getPaymentMethodName();
  })

  // Esta função será chamada quando você clicar no botão de confirmar
confirmarPedido() {
  // O componente RealizarPagamento está na rota 'pagamento' dentro de 'finalizar-compra'
  this.router.navigate(['/finalizar-compra/pagamento']);
}





  menosProduto(itemId: number) {
    if (this.cart.removerCarrinho(Number(itemId)))
      alert('Item removido do carrinho!')
    else
      alert('Erro ao remover item do carrinho!')
  }

  maisProduto(itemId: number) {
    if (this.cart.somarProduto(itemId))
      alert('Item aumentado do carrinho!')
    else
      alert('Erro ao aumentar item do carrinho!')
  }
}
