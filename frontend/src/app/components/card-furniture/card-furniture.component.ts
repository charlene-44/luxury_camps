// frontend/src/app/components/card-furniture/card-furniture.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFurniture } from '../../models/card-furniture.model';

@Component({
  selector: 'card-furniture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-furniture.component.html',
  styleUrls: ['./card-furniture.component.scss'],
})
export class FurnitureCardComponent {
  @Input() furniture!: CardFurniture;
}
