// frontend/src/app/pages/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureCardComponent } from '../../components/furniture-card/furniture-card.component';
import { Furniture } from '../../models/furniture.model';
import { FurnitureService } from '../../services/furniture.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FurnitureCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  furnitures: Furniture[] = [];

  constructor(private readonly furnitureService: FurnitureService) {}

  ngOnInit(): void {
    this.furnitureService.getFurnitures().subscribe((data) => {
      this.furnitures = data;
    });
  }
}
