import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://127.0.0.1:8000/api';
  
  // 1. Blindamos a inicialização checando se estamos no navegador
  isLoggedIn = signal<boolean>(
    typeof window !== 'undefined' ? !!localStorage.getItem('token') : false
  );

  // 2. Blindamos o usuário também
  currentUser = signal<any>(this.getUserFromStorage());

  constructor(private http: HttpClient) {}

  private getUserFromStorage(): any {
    // 3. Se não estiver no navegador (SSR), retorna null imediatamente sem quebrar
    if (typeof window === 'undefined') {
      return null;
    }
    
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  updatePassword(data: any) {
    return this.http.post(`${this.apiUrl}/update-password`, data );
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  setSession(token: string, user: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.isLoggedIn.set(true);
    this.currentUser.set(user);
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
  }
  updateUser(formdata: FormData, id: string) {
  // O Laravel Resource cria a URL no singular: /api/user/{id}
  // Forçamos o método PUT através do spoofing de parâmetro exigido pelo FormData
  formdata.append('_method', 'PUT');
  
  return this.http.post(`${this.apiUrl}/user/${id}`, formdata);
}
saveCard(data: any) {
  // Como a rota tem middleware auth:sanctum, precisamos enviar o token
  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };
  return this.http.post(`${this.apiUrl}/salvar-cartao`, data, { headers } );
}
}