import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Apresentacao } from './components/home/apresentacao/apresentacao';
import { Categorias } from './components/categorias/categorias';
import { Login } from './components/baselogin/login/login';
import { Baselogin } from './components/baselogin/baselogin';
import { Cadastro } from './components/baselogin/cadastro/cadastro';
import { Recuperacao } from './components/baselogin/recuperacao/recuperacao';
import { VisualizarProduto } from './components/visualizar-produto/visualizar-produto';

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
    },
    {
        path: 'login',
        component: Baselogin, children: [
            {
                path: '',
                component: Login    
            },
            {
                path: 'cadastro',
                component: Cadastro
            },
            {
                path: 'recuperacao',
                component: Recuperacao
            }
        ]
    },
    {
        path: 'produto',
        component: VisualizarProduto
    }
];
