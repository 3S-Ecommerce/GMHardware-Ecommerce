import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { EnderecoService, Endereco, EnderecoPayload } from '../../../../core/services/endereco';

@Component({
  selector: 'app-meus-enderecos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meus-enderecos.html',
  styleUrls: ['./meus-enderecos.scss']
})
export class MeusEnderecosComponent implements OnInit {
  private enderecoService = inject(EnderecoService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);
  enderecos: Endereco[] = [];
  mostrarFormulario = false;
  editando = false;
  enderecoEditandoId: number | null = null;
  carregando = false;
  erro = '';
  novoEndereco: EnderecoPayload = {zip_code: '', street: '', number: '', city: ''};

  constructor(){}

  ngOnInit(){
    if (!isPlatformBrowser(this.platformId)) { return; }
    setTimeout(() => { this.listar(); }, 0);
  }

  private getLocalStorageItem(chave: string): string | null {
    if (!isPlatformBrowser(this.platformId)) { return null; }
    return localStorage.getItem(chave);
  }

  private limparSessao(){
    if (isPlatformBrowser(this.platformId)) { localStorage.clear(); }
  }

  listar(){
    const token = this.getLocalStorageItem('token');
    const usuarioStr = this.getLocalStorageItem('user');
    if (!token || !usuarioStr) {
      this.carregando = false;
      this.cdr.detectChanges();
      this.router.navigate(['/login']);
      return;
    }
    this.carregando = true;
    this.erro = '';
    this.cdr.detectChanges();

    this.enderecoService.listar().subscribe({
      next: (res) => {
        this.enderecos = res;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.carregando = false;
        this.cdr.detectChanges();
        if (err.status === 401) {
          this.limparSessao();
          this.router.navigate(['/login']);
          return;
        }
        this.erro = 'Erro ao carregar endereços.';
        this.cdr.detectChanges();
      }
    });
  }

  adicionarEndereco(){
    this.mostrarFormulario = true;
    this.editando = false;
    this.enderecoEditandoId = null;
    this.erro = '';
    this.novoEndereco = {zip_code: '', street: '', number: '', city: ''};
    this.cdr.detectChanges();
  }

  editarEndereco(endereco: Endereco){
    this.mostrarFormulario = true;
    this.editando = true;
    this.enderecoEditandoId = endereco.id;
    this.erro = '';
    this.novoEndereco = {zip_code: endereco.zip_code, street: endereco.street, number: endereco.number, city: endereco.city};
    this.cdr.detectChanges();
  }

  cancelarAdicao(){
    this.mostrarFormulario = false;
    this.editando = false;
    this.enderecoEditandoId = null;
    this.erro = '';
    this.novoEndereco = {zip_code: '', street: '', number: '', city: ''};
    this.cdr.detectChanges();
  }

  salvarEndereco(){
    if (!this.formularioValido()) {
      this.erro = 'Preencha CEP, Rua, Número e Cidade.';
      this.cdr.detectChanges();
      return;
    }
    this.carregando = true;
    this.erro = '';
    this.cdr.detectChanges();

    if (this.editando && this.enderecoEditandoId !== null) {
      this.enderecoService.atualizar(this.enderecoEditandoId, this.novoEndereco).subscribe({
        next: () => {
          this.carregando = false;
          this.cancelarAdicao();
          setTimeout(() => { this.listar(); }, 0);
          alert('Endereço atualizado com sucesso!');
        },
        error: (err) => {
          console.error(err);
          this.carregando = false;
          if (err.status === 401) {
            this.limparSessao();
            this.router.navigate(['/login']);
            return;
          }
          this.erro = 'Erro ao atualizar endereço.';
          this.cdr.detectChanges();
        }
      });
      return;
    }

    this.enderecoService.salvar(this.novoEndereco).subscribe({
      next: () => {
        this.carregando = false;
        this.cancelarAdicao();
        setTimeout(() => { this.listar(); }, 0);
        alert('Endereço salvo com sucesso!');
      },
      error: (err) => {
        console.error(err);
        this.carregando = false;
        if (err.status === 401) {
          this.limparSessao();
          this.router.navigate(['/login']);
          return;
        }
        this.erro = err?.error?.message || 'Erro ao salvar endereço.';
        this.cdr.detectChanges();
      }
    });
  }

  excluirEndereco(id: number){
    if (!confirm('Excluir este endereço?')) { return; }

    this.enderecoService.excluir(id).subscribe({
      next: () => {
        setTimeout(() => { this.listar(); }, 0);
        alert('Endereço excluído com sucesso!');
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          this.limparSessao();
          this.router.navigate(['/login']);
          return;
        }
        alert('Erro ao excluir endereço.');
      }
    });
  }

  definirPadrao(id: number){
    this.enderecoService.definirPadrao(id).subscribe({
      next: () => {
        this.enderecos.forEach(endereco => { endereco.padrao = endereco.id === id ? 1 : 0; });
        this.cdr.detectChanges();
        alert('Endereço definido como padrão!');
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          this.limparSessao();
          this.router.navigate(['/login']);
          return;
        }
        alert('Erro ao definir endereço padrão.');
      }
    });
  }

  private formularioValido(): boolean {
    return (
      this.novoEndereco.zip_code.trim().length > 0 &&
      this.novoEndereco.street.trim().length > 0 &&
      this.novoEndereco.number.trim().length > 0 &&
      this.novoEndereco.city.trim().length > 0
    );
  }
}