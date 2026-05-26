import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meu-perfil.html',
  styleUrls: ['./meu-perfil.scss']
})
export class MeuPerfil implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Aqui você pode adicionar lógica de inicialização
    // Por exemplo, verificar se o usuário está autenticado
  }

  /**
   * Função para fazer logout do usuário
   */
  logout(): void {
    // Limpar dados de autenticação (ajuste conforme seu serviço de auth)
    localStorage.removeItem('token'); // Se usar token
    sessionStorage.clear(); // Limpar sessão

    // Redirecionar para home ou login
    this.router.navigate(['/']);
    
    // Ou se preferir redirecionar para página de login:
    // this.router.navigate(['/login']);
  }

  /**
   * Navegação para endereços
   */
  goToEndereco(): void {
    this.router.navigate(['/endereco']);
  }

  /**
   * Navegação para compras
   */
  goToCompras(): void {
    this.router.navigate(['/compras']);
  }

  /**
   * Navegação para cartões
   */
  goToCartao(): void {
    this.router.navigate(['/cartao']);
  }
}
