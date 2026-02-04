import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
// libs
import Swal from 'sweetalert2';
// modules
import { MaterialModule } from '../material/material-module';
// models
import { ILogin } from './login.interface';
// services
import { AutenticadorService } from '../shared/services/autenticador-service';
import { UsuarioService } from '../shared/services/usuario-service';

@Component({
  selector: 'app-login',
  imports: [
    MaterialModule,    
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private autenticadorService: AutenticadorService
  ) {
    this.criarFormulario();
  }

  private criarFormulario() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onLogon(): void {
    const login: ILogin = this.formulario.value;
    if (this.formulario.valid) {
      this.autenticarUsuario(login);
    }
  }

  private autenticarUsuario(login: ILogin): void {
    this.autenticadorService.autenticador(login).subscribe({
      next: (response) => {
        console.log('Usuário autenticado com sucesso:', response.body);
        if (response.status === HttpStatusCode.Created) {
          this.usuarioService.token = response.headers.get('authorization') || '';
          this.router.navigate(['/dashboard']);
        } 
      },
      error: (err) => {
        if (err.status === HttpStatusCode.NotFound && !err.error.mensagem) {
          Swal.fire({
            title: "Servidor não encontrado",
            text: 'Informar para a equipe de TI que o servidor backend não está disponível. ',
            icon: "warning"
          });
          return;
        }
        Swal.fire({
          title: "Acesso Negado",
          text: err.error?.mensagem || 'Erro ao autenticar usuário.',
          icon: "error"
        });
      }
    });
  }

}
