// frontend\src\app\pages\furniture-details\furniture-details.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { FurnitureService } from '../../services/furniture.service';
import { FurnitureDetails } from '../../models/furniture-details.model';

@Component({
  selector: 'app-furniture-details',
  standalone: true,
  imports: [CommonModule, GalleriaModule],
  templateUrl: './furniture-details.component.html',
  styleUrl: './furniture-details.component.scss',
})
export class FurnitureDetailsPage implements OnInit {
  furniture?: FurnitureDetails;
  images: any[] = [];
  responsiveOptions: any[] = [
    { breakpoint: '1300px', numVisible: 4 },
    { breakpoint: '575px', numVisible: 1 },
  ];
  loading = true;
  error = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly furnitureService: FurnitureService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    if (!idParam || isNaN(id) || id <= 0) {
      console.error('Invalid or missing furniture id.');
      this.error = true;
      this.loading = false;
      return;
    }
    this.loadFurnitureDetails(id);
  }

  private loadFurnitureDetails(id: number) {
    this.furnitureService.getFurnitureById(id).subscribe({
      next: (data) => {
        this.furniture = data;
        // Transform the array of image URLs into objects required by p-galleria
        if (this.furniture.imageUrls && this.furniture.imageUrls.length > 0) {
          this.images = this.furniture.imageUrls.map((url) => ({
            itemImageSrc: url,
            thumbnailImageSrc: url,
            alt: this.furniture?.name,
            title: this.furniture?.name,
          }));
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }
  
}
