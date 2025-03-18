import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FurnitureService } from '../../services/furniture.service';
import { CardFurniture } from '../../models/card-furniture.model';

@Component({
  selector: 'app-furniture-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './furniture-admin.component.html',
  styleUrls: ['./furniture-admin.component.scss']
})
export class FurnitureAdminPage implements OnInit {
  furnitures: CardFurniture[] = [];
  loading = true;
  error = false;

  constructor(private readonly furnitureService: FurnitureService) {}

  ngOnInit(): void {
    this.loadFurnitures();
  }

  private loadFurnitures() {
    this.furnitureService.getFurnitures().subscribe({
      next: (data) => {
        this.furnitures = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce meuble ?')) {
      this.furnitureService.deleteFurniture(id).subscribe({
        next: () => {
          this.furnitures = this.furnitures.filter(f => f.id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
  }
} 