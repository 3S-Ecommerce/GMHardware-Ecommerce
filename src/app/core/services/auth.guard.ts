import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    // 1. Checa se já está rodando no navegador do cliente antes de dar o alert
    if (typeof window !== 'undefined') {
      alert('Você precisa estar logado para acessar esta página!');
    }
    
    // 2. Redireciona normalmente (o Router do Angular funciona tanto no SSR quanto no navegador)
    router.navigate(['/login']);
    return false;
  }
};