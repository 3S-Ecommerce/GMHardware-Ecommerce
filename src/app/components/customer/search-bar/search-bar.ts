import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product, ProductData } from '../../../core/services/product';

// Importamos a classe 'Product' (que é o seu serviço) e a interface 'ProductData'
// import { Product, ProductData } from '../../core/services/product'; 

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  
  // CORREÇÃO: Usamos ProductData para a lista de resultados
  searchResults: ProductData[] = [];
  
  isSearching = false;
  showDropdown = false;
  private subscription: Subscription = new Subscription();

  constructor(
    // CORREÇÃO: O nome da classe do seu serviço é 'Product'
    private productService: Product, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(query => {
          if (!query || query.trim().length === 0) {
            this.searchResults = [];
            this.showDropdown = false;
            return false;
          }
          this.isSearching = true;
          return true;
        }),
        switchMap(query => this.productService.searchProducts(query || ''))
      ).subscribe({
        next: (results) => {
          this.searchResults = results;
          this.showDropdown = true;
          this.isSearching = false;
        },
        error: (err) => {
          console.error('Erro na busca:', err);
          this.isSearching = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // CORREÇÃO: O parâmetro é do tipo ProductData
  onProductSelect(id: number){
    this.showDropdown = false;
    console.log(id)
    // ALTERAÇÃO AQUI: Força o roteador a processar a navegação mesmo estando na mesma URL básica
    this.router.navigate(['/produto', { id: id }], { onSameUrlNavigation: 'reload' }); 
    this.searchControl.setValue('');
  }

  closeDropdown(): void {
    setTimeout(() => { this.showDropdown = false; }, 100);
  }
}