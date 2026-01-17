import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material-module';
import { ILogin } from './login.interface';

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
    private fb: FormBuilder
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
  }
}
