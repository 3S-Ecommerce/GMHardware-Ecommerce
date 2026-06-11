import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
  private productService = inject(Product);
  private router = inject(Router);
  searchControl = new FormControl('');
  private allProducts: ProductData[] = [];
  searchResults: ProductData[] = [];
  isSearching = false;
  showDropdown = false;
  private subscription: Subscription = new Subscription();

  constructor(){}

  ngOnInit(){
    this.carregarTodosOsProdutos();
    this.subscription.add(
      this.searchControl.valueChanges.pipe(
        debounceTime(150),
        distinctUntilChanged()
      ).subscribe({
        next: (query) => {
          this.filtrarProdutosLocalmente(query || '');
        }
      })
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private carregarTodosOsProdutos(){
    this.isSearching = true;
    this.productService.getProduct('').subscribe({
      next: (products: ProductData[]) => {
        setTimeout(() => {
          this.allProducts = products;
          this.isSearching = false;
          if (this.searchControl.value) { this.filtrarProdutosLocalmente(this.searchControl.value); }
        }, 0);
      },
      error: (err) => {
        console.error('Erro ao carregar catálogo para cache:', err);
        this.isSearching = false;
      }
    });
  }

  private filtrarProdutosLocalmente(query: string){
    const termoLimpo = query.trim().toLowerCase();
    if (!termoLimpo) {
      this.searchResults = [];
      this.showDropdown = false;
      return;
    }
    this.searchResults = this.allProducts.filter(product => product.name.toLowerCase().includes(termoLimpo));
    this.showDropdown = this.searchResults.length > 0;
  }

  onProductSelect(id: number){
    this.showDropdown = false;
    this.router.navigate(['/produto', {id: id}], {onSameUrlNavigation: 'reload'});
    this.searchControl.setValue('', {emitEvent: false});
  }

  closeDropdown(){
    setTimeout(() => { this.showDropdown = false; }, 120);
  }
}