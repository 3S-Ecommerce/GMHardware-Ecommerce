import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  EnderecoService,
  Endereco,
  EnderecoPayload
} from '../../../../../core/services/endereco';

@Component({
  selector: 'app-forma-entrega',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forma-entrega.html',
  styleUrl: './forma-entrega.scss',
})
export class FormaEntrega {

  @Input('variante') variante: string = 'receber';
  private enderecoService = inject(EnderecoService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  enderecos: Endereco[] = [];
  enderecoSelecionado: Endereco | null = null;
  mostrarEscolhaEndereco = false;
  mostrarFormularioEndereco = false;
  carregandoEnderecos = true;
  salvandoEndereco = true;
  erroEndereco = '';

  novoEndereco: EnderecoPayload = {
    zip_code: '',
    street: '',
    number: '',
    city: ''
  };

  constructor(

    @Inject(PLATFORM_ID) private platformId: object
  ) {

    afterNextRender(() => {

      if (!isPlatformBrowser(this.platformId)) {
        return;

      }

      setTimeout(() => {

        this.carregarEnderecos();

      }, 0);
    });
  }

  carregarEnderecos(): void {

    this.carregandoEnderecos = true;
    this.erroEndereco = '';

    this.enderecoService.listar().subscribe({
      next: (res) => {

        setTimeout(() => {

          // console.log('ENDEREÇOS RECEBIDOS:', res);
          this.enderecos = res || [];
  
          const enderecoPadrao = this.enderecos.find((endereco) => {

            return endereco.padrao === true || endereco.padrao === 1;

          });
  
          this.enderecoSelecionado = enderecoPadrao || this.enderecos[0] || null;
          this.carregandoEnderecos = false;
          this.salvandoEndereco = false;
          this.cdr.detectChanges();

        })
      },
      error: (err) => {

        setTimeout(() => {


          console.error('ERRO AO CARREGAR ENDEREÇOS:', err);
          this.carregandoEnderecos = false;
  
          if (err.status === 401) {

            if (isPlatformBrowser(this.platformId)) {

              localStorage.clear();
              
            }
  
            this.router.navigate(['/login']);
            return;
          }
  
          this.erroEndereco = 'Erro ao carregar endereços.';
          this.cdr.detectChanges();
        })
      }
    });
  }

  formatarEndereco(endereco: Endereco): string {
    return `${endereco.street}, ${endereco.number} - ${endereco.city} - CEP ${endereco.zip_code}`;
  }

  abrirEscolhaEndereco(): void {
    this.mostrarEscolhaEndereco = !this.mostrarEscolhaEndereco;

    if (this.mostrarEscolhaEndereco) {
      this.carregarEnderecos();
    }

    this.cdr.detectChanges();
  }

  selecionarEndereco(endereco: Endereco): void {
    this.enderecoSelecionado = endereco;
    this.mostrarEscolhaEndereco = false;
    this.mostrarFormularioEndereco = false;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        'enderecoSelecionado',
        JSON.stringify(endereco)
      );
    }

    this.cdr.detectChanges();
  }

  definirEnderecoPadrao(id: number): void {
    this.enderecoService.definirPadrao(id).subscribe({
      next: () => {
        this.enderecos.forEach((endereco) => {
          endereco.padrao = endereco.id === id ? 1 : 0;
        });

        const novoPadrao = this.enderecos.find((endereco) => endereco.id === id);

        if (novoPadrao) {
          this.enderecoSelecionado = novoPadrao;

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(
              'enderecoSelecionado',
              JSON.stringify(novoPadrao)
            );
          }
        }

        this.cdr.detectChanges();
        alert('Endereço definido como padrão!');
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao definir endereço padrão.');
      }
    });
  }

  abrirFormularioNovoEndereco(): void {
    this.mostrarFormularioEndereco = true;

    this.novoEndereco = {
      zip_code: '',
      street: '',
      number: '',
      city: ''
    };

    this.cdr.detectChanges();
  }

  cancelarNovoEndereco(): void {
    this.mostrarFormularioEndereco = false;

    this.novoEndereco = {
      zip_code: '',
      street: '',
      number: '',
      city: ''
    };

    this.cdr.detectChanges();
  }

  salvarNovoEndereco(): void {
    if (!this.formularioEnderecoValido()) {
      alert('Preencha CEP, Rua, Número e Cidade.');
      return;
    }

    this.salvandoEndereco = true;
    this.cdr.detectChanges();

    this.enderecoService.salvar(this.novoEndereco).subscribe({
      next: (res) => {
        this.enderecoSelecionado = res;

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(
            'enderecoSelecionado',
            JSON.stringify(res)
          );
        }

        this.mostrarFormularioEndereco = false;
        this.salvandoEndereco = false;
        

        this.novoEndereco = {
          zip_code: '',
          street: '',
          number: '',
          city: ''
        };

        setTimeout(() => {
          this.carregarEnderecos();
        }, 0);

        alert('Endereço cadastrado com sucesso!');
      },
      error: (err) => {
        console.error(err);

        this.salvandoEndereco = false;
        this.cdr.detectChanges();

        alert('Erro ao cadastrar endereço.');
      }
    });
  }

  selecionarEntrega(): void {
    if (!this.enderecoSelecionado) {
      this.mostrarEscolhaEndereco = true;

      if (this.enderecos.length === 0) {
        this.mostrarFormularioEndereco = true;
      }

      this.cdr.detectChanges();

      alert('Selecione ou cadastre um endereço antes de continuar.');
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        'enderecoSelecionado',
        JSON.stringify(this.enderecoSelecionado)
      );
    }

    this.router.navigate(['/finalizar-compra/forma-de-pagamento'], {
      queryParamsHandling: 'merge'
    });
  }

  private formularioEnderecoValido(): boolean {
    return (
      this.novoEndereco.zip_code.trim().length > 0 &&
      this.novoEndereco.street.trim().length > 0 &&
      this.novoEndereco.number.trim().length > 0 &&
      this.novoEndereco.city.trim().length > 0
    );
  }
}