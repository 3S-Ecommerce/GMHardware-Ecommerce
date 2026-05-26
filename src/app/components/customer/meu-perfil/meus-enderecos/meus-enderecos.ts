import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

interface Endereco {
  id: number;
  titulo: string;
  cep: string;
  tipo: string;
  contato: string;
}

@Component({
  selector: 'app-meus-enderecos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meus-enderecos.html',
  styleUrls: ['./meus-enderecos.scss']
})
export class MeusEnderecos implements OnInit {

  // Dados mockados exatamente como na imagem enviada
  enderecos: Endereco[] = [
    { 
      id: 1, 
      titulo: 'Rua Marlene Dietrich 81', 
      cep: 'CEP 04814555 - São Paulo - SP', 
      tipo: 'Endereço Residencial', 
      contato: 'Arthur Cavalcante de Souza - (11) 91036-9845' 
    },
    { 
      id: 2, 
      titulo: 'Rua Marlene Dietrich 81', 
      cep: 'CEP 04814555 - São Paulo - SP', 
      tipo: 'Endereço Residencial', 
      contato: 'Arthur Cavalcante de Souza - (11) 91036-9845' 
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Aqui você poderá carregar os dados reais do seu backend Laravel
  }

  /**
   * Função para excluir um endereço
   */
  excluirEndereco(id: number): void {
    if (confirm('Tem certeza que deseja excluir este endereço?')) {
      this.enderecos = this.enderecos.filter(e => e.id !== id);
      console.log('Endereço excluído:', id);
    }
  }

  /**
   * Navegação para adicionar novo endereço
   */
  adicionarEndereco(): void {
    console.log('Navegando para adicionar novo endereço');
    // this.router.navigate(['/meus-enderecos/novo']);
  }
}
