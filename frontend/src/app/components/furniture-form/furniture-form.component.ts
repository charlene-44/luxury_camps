// frontend\src\app\components\furniture-form\furniture-form.component.ts

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FurnitureType } from '../../models/furniture-type.model';
import { Material } from '../../models/material.model';

@Component({
  selector: 'app-furniture-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './furniture-form.component.html',
  styleUrls: ['./furniture-form.component.scss'],
})
export class FurnitureFormComponent implements OnInit, OnChanges {
  @Input() initialData: any = null;
  @Input() furnitureTypes: FurnitureType[] = [];
  @Input() materials: Material[] = [];
  @Input() statuses: string[] = [
    'Disponible',
    'Rupture de stock',
    'Discontinué',
  ];
  @Input() loading: boolean = false;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  furnitureForm!: FormGroup;
  error: string = '';

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    // Initial population if initialData is already set
    if (this.initialData) {
      this.populateForm(this.initialData);
    }
  }

  // Detect changes on input properties
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && changes['initialData'].currentValue) {
      this.populateForm(changes['initialData'].currentValue);
    }
  }

  private buildForm(): void {
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
      imageUrls: this.fb.array([this.fb.control('')]),
    });
  }

  private populateForm(data: any): void {
    this.furnitureForm.patchValue({
      name: data.name,
      description: data.description,
      size: data.size,
      colour: data.colour,
      quantity: data.quantity,
      price: data.price,
      status: data.status,
      typeId: data.typeId ? data.typeId : this.getTypeIdFromTypeName(data.type),
    });
    const materialIdsArray = this.furnitureForm.get('materialIds') as FormArray;
    // Clear previous controls if needed
    materialIdsArray.clear();
    if (data.materials && Array.isArray(data.materials)) {
      data.materials.forEach((id: number) => {
        materialIdsArray.push(this.fb.control(id));
      });
    }
    const imageUrlsArray = this.furnitureForm.get('imageUrls') as FormArray;
    imageUrlsArray.clear();
    if (data.imageUrls && data.imageUrls.length > 0) {
      data.imageUrls.forEach((url: string) => {
        imageUrlsArray.push(this.fb.control(url));
      });
    } else {
      imageUrlsArray.push(this.fb.control(''));
    }
  }

  get imageUrls(): FormArray {
    return this.furnitureForm.get('imageUrls') as FormArray;
  }

  addImageUrl(): void {
    this.imageUrls.push(this.fb.control(''));
  }

  removeImageUrl(index: number): void {
    this.imageUrls.removeAt(index);
  }

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

  submit(): void {
    if (this.furnitureForm.invalid) {
      this.error = 'Veuillez remplir tous les champs requis.';
      return;
    }
    this.error = '';
    this.formSubmit.emit(this.furnitureForm.value);
  }

  private getTypeIdFromTypeName(typeName: string): number | null {
    const found = this.furnitureTypes.find((t) => t.name === typeName);
    return found ? found.id : null;
  }
}
