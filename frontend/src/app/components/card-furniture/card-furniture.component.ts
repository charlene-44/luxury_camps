// frontend/src/app/components/furniture-card/furniture-card.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardFurniture } from '../../models/card-furniture.model';

@Component({
  selector: 'card-furniture',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './card-furniture.component.html',
  styleUrls: ['./card-furniture.component.scss'],
})
export class FurnitureCardComponent {
  @Input() furniture!: CardFurniture;
}
