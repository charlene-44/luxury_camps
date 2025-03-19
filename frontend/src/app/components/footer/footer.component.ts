import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Ajout de cet import

@Component({
  selector: 'app-footer',
  standalone: true, // Si votre composant est standalone
  imports: [CommonModule, RouterModule], // Ajout de RouterModule ici
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  imageUrl: string = 'assets/logo.png';
  currentYear: number = new Date().getFullYear();
  
  constructor() {}
  
  ngOnInit(): void {}
}