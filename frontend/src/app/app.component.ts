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
export class AppComponent  {  
}
