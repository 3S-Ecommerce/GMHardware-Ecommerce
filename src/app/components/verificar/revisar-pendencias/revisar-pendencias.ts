import { Component, computed, inject, signal } from '@angular/core';
import { HeaderService } from '../../../core/services/header-service';
import { Predios } from '../../../core/services/predios';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Pendencia } from '../../../core/services/pendencias';
import { LoadingEnvio } from '../../loading-envio/loading-envio';

@Component({
  selector: 'app-revisar-pendencias',
  imports: [LoadingEnvio],
  templateUrl: './revisar-pendencias.html',
  styleUrl: './revisar-pendencias.scss',
})
export class RevisarPendencias {
  private api = inject(Predios);
  private route = inject(ActivatedRoute);
  private apiPend = inject(Pendencia);
  private router = inject(Router);
  predio = signal<any>(null);
  ordem = signal<'Casa de Maquinas' | 'Cabina' | 'Pavimento' | 'Poço'>('Casa de Maquinas')
  loadingSubmit = signal<boolean>(false)

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.loadingSubmit.set(true)
    this.headerService.setTitulo('REVISAR PENDENCIAS')

    const predioId = this.route.snapshot.params['id'];
    this.api.getPredio(String(predioId), 'elevadores,elevadores.pendencia').subscribe({
      next: (data) => {
        const dados = data;
        this.predio.set(dados)
        this.loadingSubmit.set(false)
      },
      error: (err) => {
        console.error("Error: ", err)
      }
    })
  }

  listaPendencias = computed(() => {
    const lista = this.predio();

    if (!lista || !lista.elevadores) {
      return [];
    }

    const todasPendencias = lista.elevadores.flatMap((elevador: any) => {
      return elevador.pendencia
    })

    return todasPendencias.sort((a: any, b: any) => {
      const varA = a.location || '';
      const varB = b.location || '';
      return varA.localeCompare(varB)
    })
  })

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

  select(pendencia: any, opcao: 'aberta' | 'realizada') {
    pendencia.selecionado = opcao;
  }

  onSubmit() {
    this.loadingSubmit.set(true)
    const predio = this.predio()
    if (!predio || !predio.elevadores) {
      return alert('nenhuma pendencia')
    }
    const pendencias = predio.elevadores.flatMap((elevador: any) => {
      return elevador.pendencia
    })
    pendencias.forEach((pendencia: any) => {
      if (pendencia.selecionado) {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('status', String(pendencia.selecionado));
        this.apiPend.updatePendencia(formData, pendencia.id).subscribe({
          next: (data) => {

          },
          error: (err) => {
            console.error("Error: ", err)
          }
        })
      }
    })
    alert('Pendencias atualizadas!')
    this.loadingSubmit.set(false)
    this.router.navigate(['/verificar'])
  }
  teste() {
    console.log(this.listaOrdenada())
  }
  // 2. Criamos uma "corrente" de requisições
  //   this.elevador.getElevador(String(elevadorId)).pipe(
  //     // O switchMap recebe o resultado do elevador e retorna o Observable do prédio
  //     switchMap((dados: any) => {
  //       const predio_id = dados.predio_id;
  //       console.log('ID do Prédio encontrado:', predio_id);

  //       // Retornamos a chamada do prédio passando o ID que acabamos de descobrir
  //       return this.api.getPredio(String(elevadorId), 'elevadores.pendencia');
  //     })
  //   ).subscribe({
  //     next: (data) => {
  //       // Aqui o data já é o resultado do getPredio
  //       this.pendencias.set(data);
  //       console.log('Dados do Prédio com Pendências:', this.pendencias());
  //     },
  //     error: (err) => {
  //       console.error("Erro na cascata de consultas: ", err);
  //     }
  //   });
  // }


  // clicked(event:any, apagar:string){
  //   (event.target as Element).classList.toggle('ativo')
  //   document.querySelectorAll(apagar)
  //   console.log(event)
  // }
  // selecionado(pendencia: any, opcao: string){
  //   if(pendencia.selecionado === opcao){
  //     pendencia.selecionado = ''
  //   }
  //   else(
  //     pendencia.selecionado = opcao
  //   )
  // }
}
