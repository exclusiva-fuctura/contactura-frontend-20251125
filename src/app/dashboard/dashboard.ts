import { Component } from '@angular/core';
import { Menu } from '../shared/components/menu/menu';
import { Logout } from '../shared/components/logout/logout';
import { MaterialModule } from '../material/material-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [Menu, Logout, MaterialModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  dataSourceDespesas = [];
  dataSourceReceitas = [];
  displayedColumns: string[] = ['data', 'descricao', 'categoria', 'valor'];

  onRemover(elem: any) {
  }
}
