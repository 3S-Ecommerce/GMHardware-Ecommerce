import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Predios } from '../../core/services/predios';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-prediosgerais',
  imports: [RouterLink, Loading],
  templateUrl: './prediosgerais.html',
  styleUrl: './prediosgerais.scss',
})
export class Prediosgerais implements OnInit {
  private api = inject(Predios);
  teste = signal<any>([]);
  loading = signal<boolean>(true)
  tamanho = signal<number>(0);
  pendencias = signal<number>(0);
  @Input() rota: string = ''

  ngOnInit(): void {
    this.api.getPredio('', 'elevadores,elevadores.pendencia').subscribe({
      next: (data) => {
        this.teste.set(data)
        this.tamanho.set(this.teste().length)
        this.loading.set(false);
        //console.log(this.teste())
        //console.log(this.teste()['0'].elevadores['0'].pendencia)
        // this.teste().forEach((predios: any) => {
        //   console.log(predios)
        //   predios.elevadores.forEach((elevadores: any) => {
        //     console.log(elevadores)
        //   })
        // })
        console.log(this.teste())
      },
      error: (err) => {
        console.error("Error: ", err)
      }
    })
  }

  getPendencias(predio: any, opcao: 'todas' | 'abertas' | 'realizadas'): number {
    let total = 0
    let abertas = 0;
    let realizadas = 0;
    if (predio.elevadores && Array.isArray(predio.elevadores)) {
      predio.elevadores.forEach((elevador: any) => {
        total += elevador.pendencia.length;
        const listaPendencias = elevador.pendencia || []

        abertas += listaPendencias.filter((a: any) => a.status === 'aberta').length;
        realizadas += listaPendencias.filter((a: any) => a.status === 'realizada').length;
      });
    };
    switch (opcao) {
      case 'abertas':
        return abertas
      case 'realizadas':
        return realizadas
      case 'todas':
      default:
        return total
    }
  }
} 
