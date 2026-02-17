import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Apresentacao } from './components/apresentacao/apresentacao';
import { Categorias } from './components/categorias/categorias';

export const routes: Routes = [
    {
        path: '',
        component: Home, children: [
            {
                path: '',
                redirectTo: 'inicio',
                pathMatch: 'full'
            },
            {
                path: 'inicio',
                component: Apresentacao
            },
            {
                path: 'placas-de-video',
                component: Categorias,
                data: { categoria: 'Placas de Vídeo' }
            },
            {
                path: 'processadores',
                component: Categorias,
                data: { categoria: 'Processadores' }
            },
            {
                path: 'memorias-ram',
                component: Categorias,
                data: { categoria: 'Memórias RAM' }
            },
            {
                path: 'ssds',
                component: Categorias,
                data: { categoria: 'SSDs' }
            },
            {
                path: 'gabinetes',
                component: Categorias,
                data: { categoria: 'Gabinetes' }
            },
            {
                path: 'coolers',
                component: Categorias,
                data: { categoria: 'Coolers' }
            },
            {
                path: 'fontes',
                component: Categorias,
                data: { categoria: 'Fontes' }
            },
            {
                path: 'perifericos',
                component: Categorias,
                data: { categoria: 'Periféricos' }
            }
        ]
    }
];
