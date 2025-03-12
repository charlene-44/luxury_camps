// frontend/src/app/components/furniture-card/furniture-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Furniture } from '../../models/furniture.model';

@Component({
  selector: 'app-furniture-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './furniture-card.component.html',
  styleUrls: ['./furniture-card.component.scss']
})
export class FurnitureCardComponent {
  @Input() furniture!: Furniture;
}
