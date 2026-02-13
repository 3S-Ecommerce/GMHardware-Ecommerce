import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private itens = signal<any[]>([]);
  quantidadeTotal = computed(() => this.itens().length)
  adicionarItem(item: any){
    this.itens.update((value) => [...value, item])
    console.log(this.itens())
  }
}
