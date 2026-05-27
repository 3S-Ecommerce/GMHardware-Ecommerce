import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartaoService } from '../../../../core/services/cartao'; 

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meu-perfil.html',
  styleUrls: ['./meu-perfil.scss']
})
export class MeuPerfil implements OnInit {

  constructor(
    private router: Router,
    private cartaoService: CartaoService 
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    if (confirm('Deseja realmente sair da sua conta?')) {
      this.cartaoService.logout().subscribe({
        next: () => {
          this.limparSessaoERedirecionar();
        },
        error: (err) => {
          console.error('Erro ao deslogar no servidor:', err);
       
          this.limparSessaoERedirecionar();
        }
      });
    }
  }

  
  private limparSessaoERedirecionar(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  
  goToEndereco(): void {
    this.router.navigate(['/meus-enderecos']);
  }

  goToCompras(): void {
    this.router.navigate(['/compras']);
  }

  
  goToCartao(): void {
    this.router.navigate(['/meus-cartoes']);
  }
}
