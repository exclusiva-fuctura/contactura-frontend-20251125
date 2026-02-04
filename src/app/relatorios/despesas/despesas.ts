import { Component } from '@angular/core';
import { Menu } from '../../shared/components/menu/menu';
import { Logout } from '../../shared/components/logout/logout';
import { MaterialModule } from '../../material/material-module';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  dataSource = [];
  displayedColumns: string[] = ['data', 'descricao', 'tipo', 'valor', 'acoes'];

  get valorTotal(): number {
    return 0;
  }

  onRemover(elem: any) {
  }

  onEditar(elem: any) {
  }

  onPequisar(): void {
  }
}
