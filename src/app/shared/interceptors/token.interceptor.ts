import { HttpInterceptorFn } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  // injetar o serviço de usuário em tempo de execução para acessar o token
  const usuarioService = inject(UsuarioService);

  // verificar se o token existe antes de ir para o backend
  const token = usuarioService.token;

  // identificar a url da requisição para autenticação
  const isAuthRequest = [AppSettings.API_AUTENTICADOR].some(ep => req.url.includes(ep));

  // se não for uma requisição de autenticação e o token nao existir redirecionar para o login
  if (!isAuthRequest && !token) {
    // apresenta a mensagem de sessão expirada para o usuario
    Swal.fire({
      title: "Sessão expirada",
      html: "Sua sessão expirou ou você não está autenticado. <br/>Por favor, faça novo login.",
      icon: "warning"
    });
    
    // navega para o componente de login e levanta a exceção
    inject(Router).navigate(['/login']);
    // throw new Error('Token não encontrado');
  }

  return next(req);
};
