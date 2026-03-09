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
import { RealizarPagamento } from './components/finalizar-pedido/realizar-pagamento/realizar-pagamento';
import { Pix } from './components/finalizar-pedido/realizar-pagamento/pix/pix';
import { Cartao } from './components/finalizar-pedido/realizar-pagamento/cartao/cartao';
import { CadastroProduto } from './components/cadastro-produto/cadastro-produto';
import { TestRead } from './components/test-read/test-read';

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
                data: { categoria: 'Placa de Vídeo' }
            },
            {
                path: 'processadores',
                component: Categorias,
                data: { categoria: 'Processador' }
            },
            {
                path: 'memorias-ram',
                component: Categorias,
                data: { categoria: 'Memória RAM' }
            },
            {
                path: 'ssds',
                component: Categorias,
                data: { categoria: 'Armazenamento' }
            },
            {
                path: 'gabinetes',
                component: Categorias,
                data: { categoria: 'Gabinete' }
            },
            {
                path: 'coolers',
                component: Categorias,
                data: { categoria: 'Cooler' }
            },
            {
                path: 'fontes',
                component: Categorias,
                data: { categoria: 'Fonte' }
            },
            {
                path: 'perifericos',
                component: Categorias,
                data: { categoria: 'Periférico' }
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
            path: 'forma-de-pagamento',
            component: Pagamento
        },
        {
            path: 'revisar',
            component: Revisar
        },
        {
            path: 'pagamento',
            component: RealizarPagamento,
            children: [
                {
                    path: '',
                    component: Revisar,
                    pathMatch: 'full'
                },
                {
                    path: 'pix',
                    component: Pix
                },
                {
                    path: 'cartao',
                    component: Cartao
                }
            ]
        }
        ]
    },
    {
        path: 'cadastro',
        component: CadastroProduto,
        pathMatch: 'full'
    },
    {
        path: 'testeread',
        component: TestRead,
        pathMatch: 'full'
    }
];
