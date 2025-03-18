// frontend\src\app\pages\furniture-edit\furniture-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FurnitureService } from '../../services/furniture.service';
import { FurnitureDetails } from '../../models/furniture-details.model';
import { FurnitureType } from '../../models/furniture-type.model';
import { Material } from '../../models/material.model';

@Component({
  selector: 'app-furniture-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './furniture-edit.component.html',
  styleUrls: ['./furniture-edit.component.scss'],
})
export class FurnitureEditPage implements OnInit {
  furnitureForm!: FormGroup;
  furnitureTypes: FurnitureType[] = [];
  materials: Material[] = [];
  statuses: string[] = ['Available', 'Out of stock', 'Discontinued'];
  error: string = '';
  loading: boolean = false;
  furnitureId!: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly furnitureService: FurnitureService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du meuble depuis la route
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.furnitureId = +idParam;
    } else {
      this.error = 'ID du meuble non spécifié.';
      return;
    }

    // Initialiser le formulaire vide
    this.initializeForm();

    // Charger les listes nécessaires
    this.loadFurnitureTypes();
    this.loadMaterials();

    // Charger les détails du meuble et préremplir le formulaire
    this.loadFurnitureDetails();
  }

  initializeForm(): void {
    this.furnitureForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      size: ['', Validators.required],
      colour: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      typeId: [null, Validators.required],
      materialIds: this.fb.array([]),
      imageUrls: this.fb.array([]),
    });
  }

  // Accès au FormArray des images
  get imageUrls(): FormArray {
    return this.furnitureForm.get('imageUrls') as FormArray;
  }

  addImageUrl(url: string = ''): void {
    this.imageUrls.push(this.fb.control(url));
  }

  removeImageUrl(index: number): void {
    this.imageUrls.removeAt(index);
  }

  // Gestion du changement de case à cocher pour les matériaux
  onMaterialChange(event: any): void {
    const materialIds = this.furnitureForm.get('materialIds') as FormArray;
    const id = +event.target.value;
    if (event.target.checked) {
      materialIds.push(this.fb.control(id));
    } else {
      const index = materialIds.value.indexOf(id);
      if (index > -1) {
        materialIds.removeAt(index);
      }
    }
  }

  loadFurnitureTypes(): void {
    this.furnitureService.getFurnitureTypes().subscribe({
      next: (data) => {
        this.furnitureTypes = data;
      },
      error: (err) => console.error('Error loading types:', err),
    });
  }

  loadMaterials(): void {
    this.furnitureService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data;
      },
      error: (err) => console.error('Error loading materials:', err),
    });
  }

  loadFurnitureDetails(): void {
    this.furnitureService.getFurnitureById(this.furnitureId).subscribe({
      next: (data: FurnitureDetails) => {
        // Préremplir les champs du formulaire avec les infos du meuble
        this.furnitureForm.patchValue({
          name: data.name,
          description: data.description,
          size: data.size,
          colour: data.colour,
          quantity: data.quantity,
          price: data.price,
          status: data.status,
          // Ici, on suppose que le détail retourne le nom du type.
          // Si l'API renvoie également l'ID du type, utilisez-le directement.
          typeId: this.getTypeIdFromTypeName(data.type),
        });

        // Pour les matériaux, on suppose que data.materials contient les IDs (ou sinon adapter)
        const materialIdsArray = this.furnitureForm.get(
          'materialIds'
        ) as FormArray;
        data.materials.forEach((matId: any) =>
          materialIdsArray.push(this.fb.control(matId))
        );

        // Pour les images, préremplir le FormArray
        if (data.imageUrls && data.imageUrls.length > 0) {
          data.imageUrls.forEach((url) => this.addImageUrl(url));
        } else {
          this.addImageUrl('');
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors du chargement des détails du meuble.';
      },
    });
  }

  // Si l'API ne renvoie pas directement l'ID du type, on peut déduire l'ID à partir du nom
  getTypeIdFromTypeName(typeName: string): number | null {
    const found = this.furnitureTypes.find((t) => t.name === typeName);
    return found ? found.id : null;
  }

  submitForm(): void {
    if (this.furnitureForm.invalid) {
      this.error = 'Veuillez remplir tous les champs requis.';
      return;
    }
    this.loading = true;
    // Appel du service pour mettre à jour le meuble
    this.furnitureService
      .updateFurniture(this.furnitureId, this.furnitureForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          // Rediriger vers la page de gestion après modification
          this.router.navigate(['/furniture-management']);
        },
        error: (err) => {
          console.error(err);
          this.error =
            "Une erreur s'est produite lors de la modification du meuble.";
          this.loading = false;
        },
      });
  }
}
