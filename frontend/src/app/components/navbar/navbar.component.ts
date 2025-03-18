// frontend\src\app\components\navbar\navbar.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private readonly router: Router) {}

  gotoHomepage() {
    this.router.navigate(['/']);
  }

  gotoAdminPage() {
    this.router.navigate(['/furniture-management']);
  }
  
  gotoFurnitureCreationPage() {
    this.router.navigate(['/furniture-add']);
  }
}
