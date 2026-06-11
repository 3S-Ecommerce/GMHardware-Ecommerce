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
  auth = inject(Auth)
  adminLogado = signal<boolean>(false);
  constructor(
    private router: Router,
    private cartaoService: CartaoService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      // Cole aqui dentro o seu código original que usa o localStorage/sessionStorage. Exemplo:
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']);
      }
      // console.log('Rodando no navegador com acesso ao localStorage:', token);
      this.adminLogado.set(this.auth.admin() === 'true' ? true : false)
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
