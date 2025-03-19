import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Pour routerLink

@Component({
  selector: 'app-recrutement',
  standalone: true, // Obligatoire pour un Standalone Component
  imports: [CommonModule, RouterModule], // Ajout de RouterModule pour utiliser routerLink
  templateUrl: './recrutement.component.html',
  styleUrls: ['./recrutement.component.scss']
})
export class RecrutementComponent {}
