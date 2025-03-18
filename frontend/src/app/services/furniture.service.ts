// frontend/src/app/services/furniture.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CardFurniture } from '../models/card-furniture.model';
import { environment } from '../../environments/environment';
import { FurnitureDetails } from '../models/furniture-details.model';

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
            description: response.description || ''
          };

          return [cardFurniture];
        }

        // Si l'API renvoie déjà un tableau
        return response.map((item: any) => ({
          id: item.id || 0,
          name: item.name || '',
          price: item.price || '',
          imageUrl: item.imageUrl || '',
          description: item.description || ''
        }));
      })
    );
  }

  getFurnitureById(id: number): Observable<FurnitureDetails> {
    return this.http.get<FurnitureDetails>(`${this.apiUrl}/furniture/${id}`);
  }
}
