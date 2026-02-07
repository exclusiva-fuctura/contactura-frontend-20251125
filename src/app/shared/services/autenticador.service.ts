import { Injectable } from '@angular/core';
import { ILogin } from '../../login/login.interface';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { DaoService } from './dao.service';
import { AppSettings } from '../../app.settings';

@Injectable({
  providedIn: 'root',
})
export class AutenticadorService {

  constructor(
    private daoService: DaoService
  ) { }
  
  autenticador(login: ILogin): Observable<HttpResponse<ILogin>> { 
    return this.daoService.post<ILogin>(
      AppSettings.API_AUTENTICADOR, login, DaoService.MEDIA_TYPE_APP_JSON);
  }
}
