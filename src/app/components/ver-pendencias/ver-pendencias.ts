import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header-service';
import { ActivatedRoute } from '@angular/router';
import { Pendencia } from '../../core/services/pendencias';
import { Predios } from '../../core/services/predios';
import { Elevadores } from '../../core/services/elevadores';
import { switchMap } from 'rxjs';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-ver-pendencias',
  imports: [ Loading ],
  templateUrl: './ver-pendencias.html',
  styleUrl: './ver-pendencias.scss',
})
export class VerPendencias implements OnInit{
  private route = inject(ActivatedRoute);
  private api = inject(Predios);
  private elevador = inject(Elevadores);
  pendencias = signal<any>(null);
  loading = signal<boolean>(true)
  ordem = signal<'Casa de Maquinas' | 'Cabina' | 'Pavimento' | 'Poço'>('Casa de Maquinas')

  constructor(private headerService: HeaderService){}

  ngOnInit(): void {
  this.headerService.setTitulo('VER PENDENCIAS');
  
  // 1. Pegamos o ID da rota
  const elevadorId = this.route.snapshot.params['id'];

  // 2. Criamos uma "corrente" de requisições
  this.elevador.getElevador(String(elevadorId)).pipe(
    // O switchMap recebe o resultado do elevador e retorna o Observable do prédio
    switchMap((dados: any) => {
      const predio_id = dados.predio_id;
      
      // Retornamos a chamada do prédio passando o ID que acabamos de descobrir
      return this.api.getPredio(String(elevadorId), 'elevadores.pendencia');
    })
  ).subscribe({
    next: (data) => {
      // Aqui o data já é o resultado do getPredio
      this.pendencias.set(data);
      this.loading.set(false)
    },
    error: (err) => {
      console.error("Erro na cascata de consultas: ", err);
    }
  });
}
listaPendencias = computed(() => {
  const dados = this.pendencias();
  
  if(!dados || !dados.elevadores){
    return []
  }

  const todasPendencias = dados.elevadores.flatMap((elevador:any) => {
    return elevador.pendencia || []
  })

  return todasPendencias.sort((a: any, b: any) => {
    const locA = a.location || '';
    const locB = b.location || '';
    return locA.localeCompare(locB)
  })
})

listaOrdenada = computed(() => {
  const lista = this.listaPendencias();
  const ordem = this.ordem();

  return [...lista].sort((a, b) => {
    const valorA = String(a[ordem] || '');
    const valorb = String(b[ordem] || '');

    return valorA.localeCompare(valorb)
  }
);

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
teste(){
  console.log(this.pendencias())
  console.log(this.listaPendencias())
  console.log(this.listaOrdenada())
  console.log(this.listaAberta())
  console.log(this.listaNumero())
}
}
