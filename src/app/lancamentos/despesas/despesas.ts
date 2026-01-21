import { Component } from '@angular/core';

@Component({
  selector: 'app-despesas',
  imports: [],
  templateUrl: './despesas.html',
  styleUrl: './despesas.scss',
})
export class Despesas {

  tipos: string[] = ['Alimentação', 'Habitacão', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Outros'];
  
}
