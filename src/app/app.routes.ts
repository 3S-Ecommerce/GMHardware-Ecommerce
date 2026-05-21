import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Root } from './components/root/root';
import { VerPendencias } from './components/ver-pendencias/ver-pendencias';
import { Cadastro } from './components/cadastro/cadastro';
import { Predio } from './components/cadastro/predio/predio';
import { Elevador } from './components/cadastro/elevador/elevador';
import { EscolherCadastro } from './components/cadastro/escolher-cadastro/escolher-cadastro';
import { EscolherPredio } from './components/cadastro/escolher-predio/escolher-predio';
import { Pendencias } from './components/cadastro/pendencias/pendencias';
import { Verificar } from './components/verificar/verificar';
import { Predios } from './components/verificar/predios/predios';
import { RevisarPendencias } from './components/verificar/revisar-pendencias/revisar-pendencias';
import { RelatorioPendencias } from './components/relatorio-pendencias/relatorio-pendencias';

export const routes: Routes = [
    {
        path: '',
        component: Root,
        children: [
            {
                path: '',
                component: Inicio,
                data: { titulo: 'Início' }
            },
            {
                path: 'ver',
                component: VerPendencias,
                data: { titulo: 'Ver pendencias' }
            },
            {
                path: 'cadastro',
                component: Cadastro,
                children: [
                    {
                        path: '',
                        component: EscolherCadastro
                    },
                    {
                        path: 'predio',
                        component: Predio
                    },
                    {
                        path: 'elevador',
                        component: Elevador
                    },
                    {
                        path: 'escolher-predio',
                        component: EscolherPredio
                    },
                    {
                        path: 'pendencias',
                        component: Pendencias
                    }
                ]
            },
            {
                path: 'verificar',
                component: Verificar,
                children: [
                    {
                        path: '',
                        component: Predios
                    },
                    {
                        path: 'pendencias',
                        component: RevisarPendencias
                    }]
            }]
    },
    {
        path: 'teste',
        component: RelatorioPendencias
    }
];
