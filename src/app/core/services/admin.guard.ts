import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // 1. Primeiro garante que o usuário está autenticado
  if (authService.isAuthenticated()) {

    // 2. Depois checa se ele é de fato um administrador
    // (Lembrando que precisamos criar essa função isAdmin no seu auth.ts depois)
    if (authService.isAdmin()) {
      return true; // Deixa passar para a tela de admin
    } else {
      if (typeof window !== 'undefined') {
        alert('Acesso negado! Esta área é exclusiva para administradores.');
      }
      router.navigate(['/meu-perfil']); // Manda o usuário comum de volta pra Home
      return false;
    }

  } else {
    // Se nem logado estiver, manda pro login
    if (typeof window !== 'undefined') {
      alert('Você precisa estar logado para acessar esta página!');
    }
    router.navigate(['/meu-perfil']);
    return false;
  }
};
