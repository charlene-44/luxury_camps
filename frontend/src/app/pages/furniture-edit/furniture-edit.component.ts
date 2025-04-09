// frontend/src/app/pages/furniture-edit/furniture-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FurnitureService } from '../../services/furniture.service';
import { FurnitureDetails } from '../../models/furniture-details.model';
import { FurnitureType } from '../../models/furniture-type.model';
import { Material } from '../../models/material.model';
import { FurnitureFormComponent } from '../../components/furniture-form/furniture-form.component';

@Component({
  selector: 'app-furniture-edit',
  standalone: true,
  imports: [CommonModule, FurnitureFormComponent],
  templateUrl: './furniture-edit.component.html',
  styleUrls: ['./furniture-edit.component.scss'],
})
export class FurnitureEditPage implements OnInit {
  initialData: any = null;
  furnitureTypes: FurnitureType[] = [];
  materials: Material[] = [];
  statuses: string[] = ['Disponible', 'Rupture de stock', 'Discontinué'];
  error: string = '';
  loading: boolean = false;
  furnitureId!: number;

  constructor(
    private readonly furnitureService: FurnitureService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.furnitureId = +idParam;
    } else {
      this.error = 'ID du meuble non spécifié.';
      return;
    }
    this.loadFurnitureTypes();
    this.loadMaterials();
    this.loadFurnitureDetails();
  }

  loadFurnitureTypes(): void {
    this.furnitureService.getFurnitureTypes().subscribe({
      next: (data) => {
        this.furnitureTypes = data;
      },
      error: (err) =>
        console.error('Erreur lors du chargement des types:', err),
    });
  }

  loadMaterials(): void {
    this.furnitureService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data;
      },
      error: (err) =>
        console.error('Erreur lors du chargement des matériaux:', err),
    });
  }

  loadFurnitureDetails(): void {
    this.furnitureService
      .getFurnitureByIdForForm(this.furnitureId)
      .subscribe({
        next: (data: FurnitureDetails) => {
          this.initialData = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des détails du meuble', err);
          this.error = 'Erreur lors du chargement des détails du meuble.';
        },
      });
  }

  // Use the form data emitted from the child component directly.
  submitForm(formData: any): void {
    if (!formData) {
      this.error = 'Veuillez remplir tous les champs requis.';
      return;
    }
    this.loading = true;
    this.furnitureService
      .updateFurniture(this.furnitureId, formData)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/furniture-management']);
        },
        error: (err) => {
          console.error('Erreur lors de la modification du meuble', err);
          this.error =
            "Une erreur s'est produite lors de la modification du meuble.";
          this.loading = false;
        },
      });
  }
}
