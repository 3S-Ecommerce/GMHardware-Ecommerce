import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Compra {
  id: number;
  imagem: string;
  produto: string;
  quantidade: string;
  total: string;
  status: string;
  data: string;
}

@Component({
  selector: 'app-minhas-compras',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './minhas-compras.html',
  styleUrls: ['./minhas-compras.scss']
})
export class MinhasCompras {

  compras: Compra[] = [
    {
      id: 1001,
      imagem: '/assets/produtos/placa-video.png',
      produto: 'Placa de Vídeo Asus NVIDIA GeForce RTX 5070 ATS OC',
      quantidade: '1 unidade',
      total: '3.499,90',
      status: 'Entregue',
      data: 'Última atualização 20 de Fevereiro'
    },
    {
      id: 1002,
      imagem: '/assets/produtos/placa-video.png',
      produto: 'Placa de Vídeo Asus NVIDIA GeForce RTX 5070 ATS OC',
      quantidade: '1 unidade',
      total: '3.499,90',
      status: 'A caminho',
      data: 'Última atualização 21 de Fevereiro'
    },
    {
      id: 1003,
      imagem: '/assets/produtos/placa-video.png',
      produto: 'Placa de Vídeo Asus NVIDIA GeForce RTX 5070 ATS OC',
      quantidade: '1 unidade',
      total: '3.499,90',
      status: 'Compra cancelada',
      data: 'Última atualização 18 de Fevereiro'
    }
  ];
}