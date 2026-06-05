import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product, ProductData } from '../../../core/services/product';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  
  // Cache local contendo a lista completa vinda da API
  private allProducts: ProductData[] = [];
  
  // Resultados filtrados exibidos no HTML
  searchResults: ProductData[] = [];
  
  isSearching = false;
  showDropdown = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: Product, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Carrega todo o catálogo imediatamente ao iniciar a página
    this.carregarTodosOsProdutos();

    // Monitora a digitação e faz o filtro local em memória instantaneamente
    this.subscription.add(
      this.searchControl.valueChanges.pipe(
        debounceTime(150), // Tempo reduzido já que o filtro local não consome rede
        distinctUntilChanged()
      ).subscribe({
        next: (query) => {
          this.filtrarProdutosLocalmente(query || '');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private carregarTodosOsProdutos(): void {
    this.isSearching = true;
    
    // Chamando o método original passando string vazia para trazer tudo do banco
    this.productService.getProduct('').subscribe({
      next: (products: ProductData[]) => {
        this.allProducts = products;
        this.isSearching = false;
        
        // Se o usuário digitou algo enquanto a API respondia, aplica o filtro
        if (this.searchControl.value) {
          this.filtrarProdutosLocalmente(this.searchControl.value);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar catálogo para cache:', err);
        this.isSearching = false;
      }
    });
  }

  private filtrarProdutosLocalmente(query: string): void {
    const termoLimpo = query.trim().toLowerCase();

    // Se o input estiver vazio, esconde o dropdown
    if (!termoLimpo) {
      this.searchResults = [];
      this.showDropdown = false;
      return;
    }

    // Realiza a filtragem em memória na velocidade da luz
    this.searchResults = this.allProducts.filter(product => 
      product.name.toLowerCase().includes(termoLimpo)
    );

    // Mostra o dropdown apenas se houver correspondências
    this.showDropdown = this.searchResults.length > 0;
  }

  onProductSelect(id: number): void {
    this.showDropdown = false;
    console.log(id);
    this.router.navigate(['/produto', { id: id }], { onSameUrlNavigation: 'reload' }); 
    this.searchControl.setValue('', { emitEvent: false }); // Limpa o campo sem re-disparar o filtro
  }

  closeDropdown(): void {
    setTimeout(() => { this.showDropdown = false; }, 120);
  }
}