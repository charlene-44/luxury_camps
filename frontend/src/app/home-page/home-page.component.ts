import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [

  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  // Définissez ici vos propriétés
  title = 'Bienvenue sur Luxury Camps';
  
  constructor() { }

  ngOnInit(): void {
    // Initialisation du composant
  }
}
