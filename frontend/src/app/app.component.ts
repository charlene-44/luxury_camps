import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Importation du RouterOutlet, commenté pour le moment
import { HeaderComponent } from './header/header.component';  // Importation du composant Header
import { HomePageComponent } from './home-page/home-page.component';  // Importation du composant HomePage
import { CardFurniture } from './models/card-furniture';  // Importation de la classe CardFurniture qui représente les meubles

@Component({
  selector: 'app-root',  // Le sélecteur pour ce composant, il sera utilisé dans le HTML pour l'afficher
  imports: [
    RouterOutlet,  // Permettrait de gérer la navigation par route
    HeaderComponent,  // Inclusion du HeaderComponent dans ce composant
    HomePageComponent,  // Inclusion du HomePageComponent dans ce composant
  ],
  templateUrl: './app.component.html',  // Chemin vers le fichier HTML associé au composant
  styleUrl: './app.component.scss'  // Chemin vers le fichier de style associé au composant
})
export class AppComponent implements OnInit {  // La classe du composant AppComponent qui implémente OnInit

  // Déclaration de variables pour stocker des objets de type CardFurniture
  cardFurnitures!: CardFurniture[];  // Un tableau qui contiendra plusieurs objets de type CardFurniture
  myFurniture1!: CardFurniture;  // Déclartion d'un meuble individuel 
  myFurniture2!: CardFurniture;  
  myFurniture3!: CardFurniture;  
  myFurniture4!: CardFurniture;  

  // Méthode ngOnInit, appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Initialisation du tableau cardFurnitures avec des objets CardFurniture
    this.cardFurnitures = [
      // Création d'une instance de CardFurniture représentant une chaise
      new CardFurniture( 
        'Chaise',  
        'assets\Dior\chaise.webp',  
        10  
      ),
      // Création d'une instance de CardFurniture représentant une lampe
      new CardFurniture( 
        'Lampe',  
        'assets\Dior\lampe.webp',  
        100  
      ),
      // Création d'une instance de CardFurniture représentant un plateau
      new CardFurniture( 
        'Plateau',  
        'assets\Dior\Plateau.webp',  
        1000  
      )
    ];
  }

}
