import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Se o usuário JÁ estiver autenticado, ele não pode ver Login/Cadastro
  if (authService.isAuthenticated()) {
    router.navigate(['/perfil']); // Manda ele para a tela de informações dele
    return false; // Bloqueia a entrada no Login
  }
  
  return true; // Se não estiver logado, deixa ir para a tela de login normalmente
};