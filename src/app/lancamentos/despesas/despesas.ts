import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material-module';
// components
import { Menu } from '../../shared/components/menu/menu';
import { Logout } from '../../shared/components/logout/logout';

@Component({
  selector: 'app-despesas',
  imports: [
    Menu,
    Logout,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './despesas.html',
  styleUrl: './despesas.scss',
})
export class Despesas {

  formulario!: FormGroup;

  tipos: string[] = ['Alimentação', 'Habitacão', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Outros'];
  
  get buttonLabel(): string {
    return 'Salvar';
  }

  onLimpar(): void {
  }

  onSalvar(): void {
  }
}
