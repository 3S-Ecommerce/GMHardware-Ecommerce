import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Apresentacao } from './components/home/apresentacao/apresentacao';
import { Categorias } from './components/categorias/categorias';
import { Login } from './components/baselogin/login/login';
import { Baselogin } from './components/baselogin/baselogin';
import { Cadastro } from './components/baselogin/cadastro/cadastro';
import { Recuperacao } from './components/baselogin/recuperacao/recuperacao';
import { VisualizarProduto } from './components/visualizar-produto/visualizar-produto';
import { FinalizarPedido } from './components/finalizar-pedido/finalizar-pedido';
import { Entrega } from './components/finalizar-pedido/entrega/entrega';
import { Pagamento } from './components/finalizar-pedido/pagamento/pagamento';
import { Endereco } from './components/finalizar-pedido/entrega/endereco/endereco';
import { Escolher } from './components/finalizar-pedido/entrega/escolher/escolher';
import { Revisar } from './components/finalizar-pedido/revisar/revisar';

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
    },
    {
        path: 'finalizar-compra',
        component: FinalizarPedido,
        children: [{
            path: '',
            component: Entrega,
            children: [{
                path: '',
                component: Escolher,
            },
            {
                path: 'endereco',
                component: Endereco
            }]
        },
        {
            path: 'pagamento',
            component: Pagamento
        },
        {
            path: 'revisar',
            component: Revisar
        }
    ]
    }
];
