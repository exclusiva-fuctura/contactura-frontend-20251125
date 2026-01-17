export class AppSettings {
  public static API_ENDPOINT: string = '/api';

  public static get API_AUTENTICADOR(): string {
    return this.API_ENDPOINT + '/autenticador';
  }

  public static get API_LANCAMENTO(): string {
    return this.API_ENDPOINT + '/lancamento';
  }

  public static get API_USUARIO(): string {
    return this.API_ENDPOINT + '/usuario';
  }

  public static get API_SENHA(): string {
    return this.API_ENDPOINT + '/senha';
  }
}