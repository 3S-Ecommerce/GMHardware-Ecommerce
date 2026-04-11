import { Routes } from '@angular/router';
import { Home } from './components/customer/home/home';
import { Apresentacao } from './components/customer/home/apresentacao/apresentacao';
import { Categorias } from './components/customer/categorias/categorias';
// import { Login } from './components/customer/baselogin/login/login';
// import { Baselogin } from './components/customer/baselogin/baselogin';
// import { Cadastro } from './components/customer/baselogin/cadastro/cadastro';
// import { Recuperacao } from './components/customer/baselogin/recuperacao/recuperacao';
import { VisualizarProduto } from './components/customer/visualizar-produto/visualizar-produto';
import { FinalizarPedido } from './components/customer/finalizar-pedido/finalizar-pedido';
import { Entrega } from './components/customer/finalizar-pedido/entrega/entrega';
import { Pagamento } from './components/customer/finalizar-pedido/pagamento/pagamento';
import { Endereco } from './components/customer/finalizar-pedido/entrega/endereco/endereco';
import { Escolher } from './components/customer/finalizar-pedido/entrega/escolher/escolher';
import { Revisar } from './components/customer/finalizar-pedido/revisar/revisar';
import { RealizarPagamento } from './components/customer/finalizar-pedido/realizar-pagamento/realizar-pagamento';
import { Pix } from './components/customer/finalizar-pedido/realizar-pagamento/pix/pix';
import { Cartao } from './components/customer/finalizar-pedido/realizar-pagamento/cartao/cartao';
import { CadastroProduto } from './components/customer/cadastro-produto/cadastro-produto';
import { TestRead } from './components/customer/test-read/test-read';
import { Admin } from './components/admin/admin';
import { Produtos } from './components/admin/produtos/produtos';
import { Administradores } from './components/admin/administradores/administradores';
import { Dashboard } from './components/admin/dashboard/dashboard';
import { Editar } from './components/admin/administradores/editar/editar';
import { Novo } from './components/admin/administradores/novo/novo';
import { Geral } from './components/admin/administradores/geral/geral';
import { Geralp } from './components/admin/produtos/geral/geral';
import { Editarp } from './components/admin/produtos/editar/editar';
import { Novop } from './components/admin/produtos/novo/novo';
import { BaseLogin } from './components/base-login/base-login';
import { Login } from './components/base-login/login/login';
import { Cadastro } from './components/base-login/cadastro/cadastro';
import { NovaSenha } from './components/base-login/nova-senha/nova-senha';

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
         path: '',
         component: BaseLogin, children: [
             {
                 path: 'login',
                 component: Login
             },
             {
                 path: 'cadastro',
                 component: Cadastro
              },
             {
                 path: 'nova-senha',
                 component: NovaSenha
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
    },
    {
        path: 'admin',
        component: Admin,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'produtos'
            },
            {
                path: 'produtos',
                component: Produtos,
                children: [
                    {
                        path: '',
                        component: Geralp
                    },
                    {
                        path: 'editar',
                        component: Editarp
                    },
                    {
                        path: 'novo',
                        component: Novop
                    }
                ]
            },
            {
                path: 'administradores',
                component: Administradores,
                children: [
                    {
                        path: '',
                        component: Geral
                    },
                    {
                        path: 'editar',
                        component: Editar
                    },
                    {
                        path: 'novo',
                        component: Novo
                    }
                ]
            },
            {
                path: 'dashboard',
                component: Dashboard
            }
        ]
    }
];
