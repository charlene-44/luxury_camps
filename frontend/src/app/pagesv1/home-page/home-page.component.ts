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

  constructor(private readonly furnitureService: FurnitureService) {}

  ngOnInit(): void {
    this.furnitureService.getFurnitures().subscribe((data) => {
      this.cardFurnitures = data;
    });
  }
}
