import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { CardFurniture } from '../models/card-furniture';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule

  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  // Définissez ici vos propriétés

  @Input() cardFurniture!:CardFurniture;


  
  constructor() { }

  ngOnInit(): void {
    // Initialisation du composant
  }
}
