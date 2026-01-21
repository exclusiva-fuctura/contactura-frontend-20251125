import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Despesas } from './despesas/despesas';
import { Receitas } from './receitas/receitas';

const routes: Routes = [
  { path: 'despesa', component: Despesas },
  { path: 'despesa/:id', component: Despesas },
  { path: 'receita', component: Receitas },
  { path: 'receita/:id', component: Receitas },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
