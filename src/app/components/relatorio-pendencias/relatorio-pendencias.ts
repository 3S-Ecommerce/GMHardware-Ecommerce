import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { switchMap } from 'rxjs';
import { Elevadores } from '../../core/services/elevadores';
import { Predios } from '../../core/services/predios';
import { ActivatedRoute } from '@angular/router';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-relatorio-pendencias',
  imports: [DatePipe],
  templateUrl: './relatorio-pendencias.html',
  styleUrl: './relatorio-pendencias.scss',
})
export class RelatorioPendencias {
  pendencias = signal<any>(null);
  private api = inject(Predios);
  private elevador = inject(Elevadores);
  private route = inject(ActivatedRoute);
  ordem = signal<'Casa de Maquinas' | 'Cabina' | 'Pavimento' | 'Poço'>('Casa de Maquinas')


  ngOnInit(): void {

    const predioId = this.route.snapshot.params['id'];
    this.api.getPredio(String(predioId), 'elevadores,elevadores.pendencia').subscribe({
      next: (data) => {
        const dados = data;
        this.pendencias.set(dados)
      },
      error: (err) => {
        console.error("Error: ", err)
      }
    })
  }

  listaPendencias = computed(() => {
    const predio = this.pendencias();

    if (!predio || !predio.elevadores) {
      return [];
    }

    // Mapeamos os elevadores e injetamos o 'number' dentro de cada pendência
    const todasPendencias = predio.elevadores.flatMap((elevador: any) => {
      return elevador.pendencia.map((p: any) => ({
        ...p,
        elevador_number: elevador.number // Guardamos o número do elevador aqui
      }));
    });

    return todasPendencias.sort((a: any, b: any) => {
      const varA = a.location || '';
      const varB = b.location || '';
      return varA.localeCompare(varB);
    });
  });
  listaOrdenada = computed(() => {
    const lista = this.listaPendencias();
    const ordem = this.ordem();

    return [...lista].sort((a, b) => {
      const valorA = String(a[ordem] || '');
      const valorB = String(b[ordem] || '');
      return valorA.localeCompare(valorB);
    })
  })

  listaAberta = computed(() => {
    const lista = this.listaOrdenada();
    const tipo = 'aberta';

    return lista.filter((a) => a.status == tipo)
  })

  listaNumero = computed(() => {
    const lista = this.listaAberta();
    return [...lista].sort((a, b) => {
      const valorA = a.elevador_id || '';
      const valorB = b.elevador_id || '';

      return valorA - valorB
    })
  })
  gerarPDF() {
    const element = document.getElementById('report-container')!;

    const options = {
      margin: 0, // Margem zero aqui porque já colocamos 10mm no CSS
      filename: 'Relatorio-Pendencias.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        logging: false,
        width: 793, // Equivalente a 210mm em pixels (96 DPI)
        windowWidth: 793
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        precision: 16
      }
    };

    // Executa a geração
    (html2pdf() as any).from(element).set(options).save();
  }
}
