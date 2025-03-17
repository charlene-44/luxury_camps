import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FurnitureService } from '../../services/furniture.service';
import { FurnitureDetails } from '../../models/furniture-details.model';

@Component({
  selector: 'app-furniture-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.scss']
})
export class FurnitureDetailsComponent implements OnInit {
  furniture?: FurnitureDetails;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private furnitureService: FurnitureService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadFurnitureDetails(id);
  }

  private loadFurnitureDetails(id: number) {
    this.furnitureService.getFurnitureById(id).subscribe({
      next: (data) => {
        this.furniture = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }
} 