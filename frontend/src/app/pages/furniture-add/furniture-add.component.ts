// frontend\src\app\pages\furniture-add\furniture-add.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FurnitureService } from '../../services/furniture.service';
import { FurnitureDetails } from '../../models/furniture-details.model';
import { FurnitureType } from '../../models/furniture-type.model';
import { Material } from '../../models/material.model';
import { FurnitureFormComponent } from '../../components/furniture-form/furniture-form.component';

@Component({
  selector: 'app-furniture-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FurnitureFormComponent],
  templateUrl: './furniture-add.component.html',
  styleUrls: ['./furniture-add.component.scss'],
})
export class FurnitureAddPage implements OnInit {
  furnitureForm!: FormGroup;
  furnitureTypes: FurnitureType[] = [];
  materials: Material[] = [];
  statuses: string[] = ['Available', 'Out of stock', 'Discontinued'];
  error: string = '';
  loading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly furnitureService: FurnitureService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // Build the form
    this.furnitureForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      size: ['', Validators.required],
      colour: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      typeId: [null, Validators.required],
      materialIds: this.fb.array([]), // will be updated via checkboxes
      imageUrls: this.fb.array([this.fb.control('')]), // start with one empty control
    });

    this.loadFurnitureTypes();
    this.loadMaterials();
  }

  // Helper to access imageUrls FormArray
  get imageUrls(): FormArray {
    return this.furnitureForm.get('imageUrls') as FormArray;
  }

  addImageUrl(): void {
    this.imageUrls.push(this.fb.control(''));
  }

  removeImageUrl(index: number): void {
    this.imageUrls.removeAt(index);
  }

  // Called when a material checkbox is changed
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
    // Assumes your backend provides an endpoint (GET /api/furniture-types)
    this.furnitureService.getFurnitureTypes().subscribe({
      next: (data) => {
        this.furnitureTypes = data;
      },
      error: (err) => console.error('Error loading types:', err),
    });
  }

  loadMaterials(): void {
    // Assumes your backend provides an endpoint (GET /api/materials)
    this.furnitureService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data;
      },
      error: (err) => console.error('Error loading materials:', err),
    });
  }

  submitForm(formData: any): void {
    if (!formData) {
      this.error = 'Veuillez remplir tous les champs requis.';
      return;
    }
    this.loading = true;
    // Call your service to create furniture
    this.furnitureService.createFurniture(this.furnitureForm.value).subscribe({
      next: (result: FurnitureDetails) => {
        this.loading = false;
        // Navigate to management or details page after successful creation
        this.router.navigate(['/furniture-management']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'An error occurred while creating furniture.';
        this.loading = false;
      },
    });
  }
}
