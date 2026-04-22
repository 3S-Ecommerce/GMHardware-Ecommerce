import { computed, Injectable, signal } from '@angular/core';

export interface cartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number
}

@Injectable({
  providedIn: 'root',
})

export class Cart {
  cartItems = signal<cartItem[]>([]);
  teste = []
  items = computed(() => this.cartItems());

  totalItems = computed(() => {
    return this.cartItems().reduce((acc, value) => acc + value.quantity, 0)
  })

  adicionarCarrinho(item: cartItem) {
    try {
      const localSalvo = localStorage.getItem('carrinho')
      this.cartItems.set(JSON.parse(`${localSalvo}`) || [])
      const existe = (this.cartItems().find(i => i.id === item.id) || false)
      const listaAtual = this.cartItems()
      if (existe) {
        const updateItem = listaAtual.map(i => i.id === item.id ? { ...item, quantity: (i.quantity || 0) + 1 } : i)
        this.cartItems.set(updateItem);
      } else {
        this.cartItems.set([...this.cartItems(), { ...item, quantity: 1 }])
      }
      localStorage.setItem('carrinho', JSON.stringify(this.cartItems()))
      return true
    } catch (e) {
      console.error("Erro ao adicionar ao carrinho! ERRO: ", e)
      return false;
    }
  }

  somarProduto(itemId: number) {
    try {
      Number(itemId)
      const localSalvo = localStorage.getItem('carrinho');
      this.cartItems.set(JSON.parse(`${localSalvo}`) || []);
      const existe = (this.cartItems().find(i => i.id = itemId));
      const listaAtual = this.cartItems();
      if (existe) {
        const updateItem = listaAtual.map(i => i.id === itemId ? { ...i, quantity: (i.quantity + 1 || 0) } : i);
        localStorage.setItem('carrinho', JSON.stringify(updateItem));
        return true;
      }
      else {
        return false
      }
    }
    catch (e) {
      console.error('Erro ao adicionar item ao carrinho!')
      return false
    }
  }

  removerCarrinho(itemId: Number) {
    try {
      itemId = Number(itemId)
      const localSalvo = localStorage.getItem('carrinho');
      this.cartItems.set(JSON.parse(`${localSalvo}`) || []);
      const existe = (this.cartItems().find(i => i.id === itemId) || false)
      const listaAtual = this.cartItems()
      if (existe) {
        const updateItem = listaAtual.map(i => i.id === itemId ? { ...i, quantity: (i.quantity - 1 || 0) } : i)
        const deletar = updateItem.find(i => i.id === itemId && i.quantity <= 0);
        if (deletar) {
          const deleteItem = updateItem.filter(i => i.id !== itemId)
          this.cartItems.set(deleteItem)
          localStorage.setItem('carrinho', JSON.stringify(this.cartItems()))
          return true
        } else {
          localStorage.setItem('carrinho', JSON.stringify(updateItem));
          return true
        }
      } else {
        return false
      }
    }
    catch (e) {
      console.error('Erro ao remover item do carrinho. Erro: ', e);
      return false
    }
  }

  apagarCarrinho() {
    this.cartItems.set([])
    localStorage.setItem('carrinho', JSON.stringify(this.cartItems()))
  }

  testar() {
    console.log(this.cartItems())
  }
}