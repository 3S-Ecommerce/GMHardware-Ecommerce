import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { EnderecoService, Endereco } from '../../../../core/services/endereco';

@Component({
  selector: 'app-meus-enderecos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meus-enderecos.html',
  styleUrls: ['./meus-enderecos.scss']
})
export class MeusEnderecosComponent implements OnInit {
  enderecos: Endereco[] = [];
  mostrarFormulario = false;
  novoEndereco = { street: '', number: '', neighborhood: '', city: '', state: '', zip_code: '', type: 'Residencial', contact_name: '', contact_phone: '' };

  constructor(private enderecoService: EnderecoService, private router: Router) {}

  ngOnInit() { this.listar(); }

  listar() {
    this.enderecoService.listar().subscribe({ next: (res) => this.enderecos = res });
  }

  adicionarEndereco() { this.mostrarFormulario = true; }

  cancelarAdicao() { this.mostrarFormulario = false; }

  salvarEndereco() {
    this.enderecoService.salvar(this.novoEndereco).subscribe({
      next: (res) => {
        this.enderecos.push(res);
        this.mostrarFormulario = false;
        this.novoEndereco = { street: '', number: '', neighborhood: '', city: '', state: '', zip_code: '', type: 'Residencial', contact_name: '', contact_phone: '' };
      }
    });
  }

  excluirEndereco(id: number) {
    if (confirm('Excluir este endereço?')) {
      this.enderecoService.excluir(id).subscribe({
        next: () => this.enderecos = this.enderecos.filter(e => e.id !== id)
      });
    }
  }
}
