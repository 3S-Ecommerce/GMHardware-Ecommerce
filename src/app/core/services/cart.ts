import { computed, Injectable, signal } from '@angular/core';

export interface cartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number
}

// CORREÇÃO: Adicionado 'type' para satisfazer o 'isolatedModules'
export type { cartItem as item };

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // ... resto do seu código permanece igual ...
  cartItems = signal<cartItem[]>([]);
  teste = []
  items = computed(() => this.cartItems());

  iniciar() {
    try {
      const localSalvo = localStorage.getItem('carrinho')
      this.cartItems.set(JSON.parse(`${localSalvo}`) || [])
    }
    catch (e) {
      console.error('Error: ', e)
    }
  }

  obterCarrinho() {
    const localSalvo = localStorage.getItem('carrinho');
    return JSON.parse(`${localSalvo}`) || [];
  }

  limparCarrinho() {
    this.cartItems.set([]);
    localStorage.removeItem('carrinho');
  }

  totalItems = computed(() => {
    if (this.cartItems())
      return this.cartItems().reduce((acc, value) => acc + value.quantity, 0)
    else 
      return 0
  })

  valorTotal = computed(() => {
    return this.cartItems().reduce((acc, value) => acc + (value.price * value.quantity), 0)
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
      const existe = (this.cartItems().find(i => i.id === itemId));
      const listaAtual = this.cartItems();
      if (existe) {
        const updateItem = listaAtual.map(i => i.id === itemId ? { ...i, quantity: (i.quantity + 1 || 0) } : i);
        localStorage.setItem('carrinho', JSON.stringify(updateItem));
        this.cartItems.set(updateItem)
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
          const deleteItem = this.cartItems().filter(i => i.id !== itemId)
          this.cartItems.set(deleteItem)
          localStorage.setItem('carrinho', JSON.stringify(this.cartItems()))
          return true
        } else {
          localStorage.setItem('carrinho', JSON.stringify(updateItem));
          this.cartItems.set(updateItem)
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

  apagarItem(itemId: number) {
    const localSalvo = localStorage.getItem('carrinho');
    this.cartItems.set(JSON.parse(`${localSalvo}`) || []);
    const existe = (this.cartItems().find(i => i.id === itemId) || false);
    const listaAtual = this.cartItems()
    if (existe) {
      const updateItem = listaAtual.filter(i => i.id !== itemId);
      this.cartItems.set(updateItem)
      localStorage.setItem('carrinho', JSON.stringify(this.cartItems()))
      return true
    }
    else {
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

export { CartService as Cart };
