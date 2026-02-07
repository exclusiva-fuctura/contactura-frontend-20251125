import { Component } from '@angular/core';
import { Router } from '@angular/router';
// modules
import { MaterialModule } from '../material/material-module';

@Component({
  selector: 'app-page-not-found',
  imports: [MaterialModule],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',
})
export class PageNotFound {
  constructor(
    private router: Router
  ) {} 
  
  onLogout(): void {
    this.router.navigate(['/login']);
  }
}
