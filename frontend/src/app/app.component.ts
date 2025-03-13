// frontend\src\app\app.component.ts

import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component'
import { HomePageComponent } from './home-page/home-page.component'; 

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    HeaderComponent,
    HomePageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
