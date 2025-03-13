import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Importation du RouterOutlet, commenté pour le moment
import { HeaderComponent } from './header/header.component';  // Importation du composant Header
import { CardFurniture } from './models/card-furniture';  // Importation de la classe CardFurniture qui représente les meubles
import { FurnitureService } from './services/furniture.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pagesv1/home-page/home-page.component';
@Component({
  selector: 'app-root',  // Le sélecteur pour ce composant, il sera utilisé dans le HTML pour l'afficher
  imports: [
    RouterOutlet,  // Permettrait de gérer la navigation par route
    HeaderComponent,  // Inclusion du HeaderComponent dans ce composant
    HomeComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',  // Chemin vers le fichier HTML associé au composant
  styleUrl: './app.component.scss'  // Chemin vers le fichier de style associé au composant
})
export class AppComponent implements OnInit {  // La classe du composant AppComponent qui implémente OnInit

  // Déclaration de variables pour stocker des objets de type CardFurniture
  cardFurnitures: any[] = []; // Stocke les données de l'API

  constructor(private furnitureService: FurnitureService) { }


  // Méthode ngOnInit, appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // 🔥 Récupération des données de l'API
    this.furnitureService.getFurnitures().subscribe({
      next: (data) => {
        console.log('Données API reçues:', data);
        this.cardFurnitures = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      },
      complete: () => {
        console.log('Récupération des données terminée.');
      }
    });
  }  
}
