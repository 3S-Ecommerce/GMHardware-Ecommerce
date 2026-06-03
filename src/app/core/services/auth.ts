import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // private readonly apiUrl = 'http://localhost:8000/api';
  private apiUrl = 'https://gmhardware-ecommerce.onrender.com/api';

  // 1. Blindamos a inicialização checando se estamos no navegador
  isLoggedIn = signal<boolean>(
    typeof window !== 'undefined' ? !!localStorage.getItem('token') : false
  );

  // 2. Blindamos o usuário também
  currentUser = signal<any>(this.getUserFromStorage());
  admin = signal<string>(this.getUserAdmin())

  constructor(private http: HttpClient) {}

  private getUserFromStorage(): any {
    // 3. Se não estiver no navegador (SSR), retorna null imediatamente sem quebrar
    if (typeof window === 'undefined') {
      return null;
    }
  
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private getUserAdmin(): string {
    if (typeof window === 'undefined') return 'false';
    const admin = localStorage.getItem('admin');
    return admin ? admin : 'false';
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

  // ADICIONE ESTE MÉTODO AQUI:
  isAdmin(): boolean {
    const user = this.admin(); // Lê o valor atual do seu Signal
    console.log(user)
    if (!user) return false;
    // Checa se o campo vindo do seu Laravel é 'role' ou 'is_admin'
    // Esse IF cobre as três formas mais comuns que o Laravel devolve:
    return user === 'true';
  }

  setSession(token: string, user: any, admin:boolean) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      const adminString = admin ? 'true' : 'false';
      localStorage.setItem('admin', adminString);
      
      // 🔥 CORREÇÃO: Atualiza o Signal para o app reagir instantaneamente
      this.admin.set(adminString);
    }
    this.isLoggedIn.set(true);
    this.currentUser.set(user);
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
    }
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.admin.set('false');
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
