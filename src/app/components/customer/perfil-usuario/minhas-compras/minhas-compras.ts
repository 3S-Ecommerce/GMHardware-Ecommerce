import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComprasService } from '../../../../core/services/compras';

@Component({
  selector: 'app-minhas-compras',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './minhas-compras.html',
  styleUrls: ['./minhas-compras.scss']
})
export class MinhasComprasComponent implements OnInit {
  // Usamos any[] para que o Angular aceite qualquer propriedade vinda do JSON do Laravel
  compras: any[] = [];

  constructor(private comprasService: ComprasService) {}

  ngOnInit(): void {
    this.comprasService.listarCompras().subscribe({
      next: (res) => {
        this.compras = res;
      },
      error: (err) => {
        console.error('Erro ao carregar compras:', err);
      }
    });
  }

  formatarData(data: string): string {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR');
  }
}
