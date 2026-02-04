import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lancamento } from '../models/lancamento';
import { AppSettings } from '../../app.settings';
import { DaoService } from './dao-service';
import { IDespesa } from '../models/despesa.interface';
import { IReceita } from '../models/receita.interface';
import { OperacaoTypeEnum } from '../enums/operacao-type.enum';

@Injectable({
  providedIn: 'root',
})
export class LancamentosService {

  private lancamentoSelecionado: Lancamento = {} as Lancamento;

  constructor(
    private daoService: DaoService
  ) { }

  get modoEdicao(): boolean {
    return (sessionStorage.getItem('modoEdicao') === OperacaoTypeEnum.EDITAR);
  }

  set modoEdicao(ehEdicao: boolean) {
    if (ehEdicao) {
      sessionStorage.setItem('modoEdicao', OperacaoTypeEnum.EDITAR);
    } else {
      sessionStorage.setItem('modoEdicao', OperacaoTypeEnum.SALVAR);
    }
  }

  /**
   * Grava o lancamento selecionado
   * @param lancamento instancia de um lancamento
   * @returns retorna objeto lancamento selecionada
   */
  gravaLancamentoSelecionado(lancamento: Lancamento): void {
    if (lancamento) {
      this.lancamentoSelecionado = lancamento;   }
  }

  /**
   * Remover o lancamento selecionado do sessão colocando um lancamento vazio
   */
  limparLancamentoSelecionado(): void {
    this.lancamentoSelecionado = {} as Lancamento;
  }

  /**
   * Recupera o lancamento selecionado 
   * @returns retorna objeto lancamento selecionada
   */
  recuperaLancamentoSelecionado(): Lancamento {
    
    if (!this.lancamentoSelecionado.id) {
      return null as unknown as Lancamento;
    }    
    return this.lancamentoSelecionado;
  }

  /**
   * Converte um lancamento para uma despesa
   * @param lancamento instancia de um lancamento
   * @returns retorna uma instancia de um objeto despesa
   */
  private lancamentoToDespesa(lancamento: Lancamento): IDespesa {
    return {
      id: lancamento.id,
      data: lancamento.data,
      descricao: lancamento.descricao,
      ehFixo: lancamento.ehFixo,
      tipo: lancamento.tipo,
      valor: lancamento.valor
    }
  }

  /**
   * Converte um lancamento para uma receita
   * @param lancamento instancia de um lancamento
   * @returns retorna uma instancia de um objeto receita
   */
  private lancamentoToReceita(lancamento: Lancamento): IReceita {
    return {
      id: lancamento.id,
      data: lancamento.data,
      descricao: lancamento.descricao,
      ehFixo: lancamento.ehFixo,
      tipo: lancamento.tipo,
      valor: lancamento.valor
    }
  }

  /**
   * Obtem uma instância do tipo correto (Despesa ou Receita) a partir de um lancamento
   * @param lancamento instancia de um lancamento
   * @returns retorna uma instancia de um objeto despesa ou receita
   */
  extractTypeLancamento(lancamento: Lancamento): IDespesa | IReceita {
    if (lancamento.ehReceita) {
      return this.lancamentoToReceita(lancamento);
    } else {
      return this.lancamentoToDespesa(lancamento);
    }
  }

  /**
   * Converte uma receita para um lancamento
   * @param objeto instancia de um objeto receita
   * @returns retorna uma instancia de um lancamento
   */
  receitaToLancamento(objeto: IReceita): Lancamento {    
    return new Lancamento(objeto, true);
  }

  /**
   * Converte uma despesa para um lancamento
   * @param objeto instancia de um objeto despesa
   * @returns retorna uma instancia de um lancamento
   */
  despesaToLancamento(objeto: IDespesa): Lancamento {
    return new Lancamento(objeto, false);
  }

  /**
   * 
   * @returns Listar lancamentos existentes
   */
  listarLancamentos(): Observable<HttpResponse<Lancamento[]>> {
    return this.daoService.get<Lancamento[]>(AppSettings.API_LANCAMENTO, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * Criar uma novo lancamento
   * @param lancamento instancia de um lancamento
   * @return retorna objeto lancamento criada
   */
  criarLancamento(lancamento: Lancamento): Observable<HttpResponse<Lancamento>> {
    return this.daoService.post<Lancamento>(AppSettings.API_LANCAMENTO, lancamento, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * Atualiza um lancamento existente na base
   * @param lancamento instancia de um lancamento
   * @returns retorna objeto lancamento alterada
   */
  atualizarLancamento(lancamento: Lancamento): Observable<HttpResponse<Lancamento>> {
    return this.daoService.put<Lancamento>(`${AppSettings.API_LANCAMENTO}/${lancamento.id}`, lancamento, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * Recupera os dados de um Lancamento
   * @param id identificador do lancamento
   * @returns retorna objeto lancamento existente
   */
  obterLancamento(id:number): Observable<HttpResponse<Lancamento>>{
    return this.daoService.get<Lancamento>(`${AppSettings.API_LANCAMENTO}/${id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * Remove lancamento da base
   * @param id identificador do lancamento
   * @returns retorna objeto lancamento excluido
   */
  removerLancamento(id: number): Observable<HttpResponse<Lancamento>> {
    return this.daoService.delete<Lancamento>(`${AppSettings.API_LANCAMENTO}/${id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }  
}
