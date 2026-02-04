import { Injectable } from '@angular/core';
import { AppState } from '../../app.state';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  
  constructor(
    private state: AppState
  ) { }

  set token(token: string) {
    this.state.token = token;
  }

  get token(): string {
    return this.state.token;
  }
}
