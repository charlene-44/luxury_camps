// frontend/src/app/pages/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureService } from '../../services/furniture.service';
import { CardFurniture } from '../../models/card-furniture';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})

export class HomeComponent implements OnInit {
  cardFurnitures: CardFurniture[] = [];
  loading = true;
  error = false;

  constructor(private furnitureService: FurnitureService) {}

  ngOnInit() {
    this.loadFurnitures();
  }

  loadFurnitures() {
    this.furnitureService.getFurnitures().subscribe({
      next: (data) => {
        console.log('Données reçues dans le composant:', data);
        this.cardFurnitures = data;
        console.log('CardFurnitures après affectation:', this.cardFurnitures);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des meubles:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  onImageLoad(url: string) {
    console.log('Image chargée avec succès:', url);
  }

  handleImageError(event: any) {
    console.error('Erreur de chargement de l\'image:', event.target.src);
    console.error('URL qui a échoué:', event.target.src);
    event.target.src = '/assets/images/placeholder.png';
  }
}
