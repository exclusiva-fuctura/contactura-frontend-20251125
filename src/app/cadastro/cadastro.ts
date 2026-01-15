import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, RouterModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {

  constructor(private router: Router){}
  
  onVoltar(): void {
    this.router.navigate(['/login']);
  }
}
