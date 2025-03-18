// frontend/src/app/services/furniture.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { CardFurniture } from '../models/card-furniture.model';
import { environment } from '../../environments/environment';
import { FurnitureDetails } from '../models/furniture-details.model';
import { FurnitureType } from '../models/furniture-type.model';
import { Material } from '../models/material.model';

@Injectable({
  providedIn: 'root',
})
export class FurnitureService {
  private readonly apiUrl = `${environment.apiUrl}/api`;

  constructor(private readonly http: HttpClient) {}

  getFurnitures(): Observable<CardFurniture[]> {
    return this.http.get<any>(`${this.apiUrl}/furnitures`).pipe(
      map((response) => {
        // console.log('Raw API response:', response);
        // Si l'API renvoie un objet unique, le transformer en tableau
        if (!Array.isArray(response)) {
          const cardFurniture: CardFurniture = {
            id: response.id || 0,
            name: response.name || '',
            price: response.price || '',
            imageUrl: response.imageUrl || '',
          };

          return [cardFurniture];
        }

        // Si l'API renvoie déjà un tableau
        return response.map((item: any) => ({
          id: item.id || 0,
          name: item.name || '',
          price: item.price || '',
          imageUrl: item.imageUrl || '',
        }));
      })
    );
  }

  getFurnitureById(id: number): Observable<FurnitureDetails> {
    return this.http.get<FurnitureDetails>(`${this.apiUrl}/furniture/${id}`);
  }

  deleteFurniture(id: number) {
    return this.http.delete(`${this.apiUrl}/furniture/${id}`);
  }

  // New method to create furniture
  createFurniture(furnitureData: any): Observable<FurnitureDetails> {
    return this.http.post<FurnitureDetails>(
      `${this.apiUrl}/furniture`,
      furnitureData
    );
  }

  // New method to load furniture types
  getFurnitureTypes(): Observable<FurnitureType[]> {
    // return this.http.get<FurnitureType[]>(`${this.apiUrl}/furniture-types`);

    const furnitureTypes: FurnitureType[] = [
      {
        id: 1,
        name: 'Chaise',
      }
    ]

    return of(furnitureTypes);
  }

  // New method to load materials
  getMaterials(): Observable<Material[]> {
    // return this.http.get<Material[]>(`${this.apiUrl}/materials`);

    const materials: Material[] = [
      {
        id: 1,
        name: 'Acier',
      },
      {
        id: 2,
        name: 'Aluminium',
      }
    ]

    return of(materials);
  }
}
