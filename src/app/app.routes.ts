import { Routes } from '@angular/router';
// components
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { PageNotFound } from './page-not-found/page-not-found';
import { Dashboard } from './dashboard/dashboard';
import { Despesas } from './relatorios/despesas/despesas';
import { Receitas } from './relatorios/receitas/receitas';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'cadastro', component: Cadastro },
    { path: 'dashboard', component: Dashboard },
    { path: 'relatorio-despesa', component: Despesas },
    { path: 'relatorio-receita', component: Receitas },
    { path: 'lancamentos', loadChildren: () => import('./lancamentos/lancamentos-module').then(m =>
        m.LancamentosModule)},    
    { path: '**', component: PageNotFound},
];
