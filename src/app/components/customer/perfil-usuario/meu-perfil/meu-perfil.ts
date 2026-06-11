import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartaoService } from '../../../../core/services/cartao';
import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meu-perfil.html',
  styleUrls: ['./meu-perfil.scss']
})
export class MeuPerfil implements OnInit {
  private platformId = inject(PLATFORM_ID);
  auth = inject(Auth);
  adminLogado = signal<boolean>(false);

  constructor(private router: Router, private cartaoService: CartaoService){}

  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (!token) { this.router.navigate(['/login']); }
      this.adminLogado.set(this.auth.admin() === 'true' ? true : false);
    }
  }

  logout(){
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

  private limparSessaoERedirecionar(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  goToEndereco(){
    this.router.navigate(['/meus-enderecos']);
  }

  goToCompras(){
    this.router.navigate(['/compras']);
  }

  goToCartao(){
    this.router.navigate(['/meus-cartoes']);
  }
}