import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
// classes locais
import { routes } from './app.routes';
// services
import { UsuarioService } from './shared/services/usuario.service';
import { AppState } from './app.state';
import { LoadingService } from './shared/services/loading.service';
// interceptors
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';
import { Token } from '@angular/compiler';

registerLocaleData(localePt, 'pt-BR');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor,tokenInterceptor])),
    // Força a aplicação a usar o pt-BR como local padrão para formatação de datas, números, etc.
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    UsuarioService,
    LoadingService,
    AppState
  ]
};
