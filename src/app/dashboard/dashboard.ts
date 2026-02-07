import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
// libs
import Swal from 'sweetalert2';
// modules
import { MaterialModule } from '../material/material-module';
// services
import { MenuService } from '../shared/services/menu.service';
import { LancamentosService } from '../shared/services/lancamentos-service';
// components
import { Menu } from '../shared/components/menu/menu';
import { Logout } from '../shared/components/logout/logout';
import { Router } from '@angular/router';
// enums
import { MenuTypeEnum } from '../shared/enums/menu-type.enum';
import { IDespesa } from '../shared/models/despesa.interface';
import { Lancamento } from '../shared/models/lancamento';
import { IReceita } from '../shared/models/receita.interface';

@Component({
  selector: 'app-dashboard',
    imports: [
    Menu,
    Logout,
    MaterialModule, 
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  dataSourceDespesas: IDespesa[] = [];
  dataSourceReceitas: IReceita[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];
  
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private menuService: MenuService,
    private lancamentoService: LancamentosService
  ) {
    this.menuService.ondeEstou = MenuTypeEnum.DASHBOARD;
    this.listarLancamentos();
  }

  /** 
   * carregar as lista de lancamentos (Recitas e Despesas)
   * @return void
   */
  private listarLancamentos(): void {    
    this.lancamentoService.listarLancamentos().subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.Ok) {
          const lancamentos = response.body ? response.body : [];
          // despesas
          this.dataSourceDespesas = lancamentos.filter(lanc => lanc.ehReceita === false).slice(0,5);
          // receitas
          this.dataSourceReceitas = lancamentos.filter(lanc => lanc.ehReceita === true).slice(0,5);
          // garante que o Angular reavalie a view após a mudança
          this.cdr.detectChanges();
        }
      }
    });
  }

  /**
   * Remover despesa da base
   * @param id numero do lancamento
   * @return void
   */
  private removerDespesa(id: number): void {    
    this.lancamentoService.removerLancamento(id).subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.Ok) {
          Swal.fire(
            'SUCESSO: Remover Despesa',
            'Despesa removida com sucesso',
            'success'
          )
        }
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire(
          'ALERTA: Remover Despesa',
          err.error.mensagem ? err.error.mensagem : 'Ocorrer um erro inesperado. ['+ err.error.error +']',
          'warning'
        )
      }
    });
  }

  private removerReceita(id: number): void {    
    this.lancamentoService.removerLancamento(id).subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.Ok) {
          Swal.fire(
            'SUCESSO: Remover Receita',
            'Receita removida com sucesso',
            'success'
          )
        }
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire(
          'ALERTA: Remover Receita',
          err.error.mensagem ? err.error.mensagem : 'Ocorrer um erro inesperado. ['+ err.error.error +']',
          'warning'
        )
      }
    });
  }

  /**
   * Método que responde a um evento para remover a despesa da base
   * @param despesa instancia do objeto despesa
   */
  onRemoverDespesa(despesa: IDespesa): void {
    if(despesa) {
      Swal.fire({
        title: 'Remover Despesa',
        text: `Deseja remover a despesa '${despesa.descricao.toUpperCase()}' ?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remova!'
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          const id = despesa.id ? despesa.id : 0;
          this.removerDespesa(id);
        }
      });
    }
  }

  /**
   * Método que responde a um evento para editar a despesa
   * @param item instancia do objeto lancamento
   */
  onEditDespesa(item: Lancamento): void {
    if(item) {
      this.lancamentoService.modoEdicao = true;
      this.lancamentoService.gravaLancamentoSelecionado(item);
      this.router.navigate(['lancamentos/despesa/'+item.id]);
    }
  }

  /**
   * Método que responde a um evento para remover a receita
   * @param receita instancia do objeto receita
   */
  onRemoverReceita(receita: IReceita): void {
  if(receita) {
      Swal.fire({
        title: 'Remover Receita',
        text: `Deseja remover a receita '${receita.descricao.toUpperCase()}' ?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remova!'
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          const id = receita.id ? receita.id : 0;
          this.removerReceita(id);
        }
      });
    }
  }

  /**
   * Método que responde a um evento para editar a receita
   * @param item instancia do objeto lancamento
   */  
  onEditReceita(item: Lancamento): void {
    if(item) {
      this.lancamentoService.modoEdicao = true;
      this.lancamentoService.gravaLancamentoSelecionado(item);
      this.router.navigate(['lancamentos/receita/'+item.id]);
    }
  }
}
