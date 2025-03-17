// frontend/src/app/pages/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureService } from '../../services/furniture.service';
import { CardFurniture } from '../../models/card-furniture.model';
import { FurnitureCardComponent } from '../../components/card-furniture/card-furniture.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FurnitureCardComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePage implements OnInit {
  cardFurnitures: CardFurniture[] = [];
  loading = true;
  error = false;

  constructor(private readonly furnitureService: FurnitureService) {}

  ngOnInit(): void {
    this.loadFurnitures();
  }

  private loadFurnitures() {
    this.furnitureService.getFurnitures().subscribe({
      next: (data) => {
        this.cardFurnitures = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
