import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth'; // Certifique-se de que o nome do arquivo de serviço é 'auth.ts'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Se o método que criamos no serviço retornar true, ele deixa entrar na página
  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Se não estiver logado, manda para o login e bloqueia o acesso
    alert('Você precisa estar logado para acessar esta página!');
    router.navigate(['/login']);
    return false;
  }
};
