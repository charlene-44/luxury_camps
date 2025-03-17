// frontend/src/app/services/furniture.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CardFurniture } from '../models/card-furniture.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FurnitureService {
  private readonly apiUrl = `${environment.apiUrl}/api/furnitures`;

  constructor(private readonly http: HttpClient) {}

  getFurnitures(): Observable<CardFurniture[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        // Adapter la réponse de l'API au format CardFurniture[]
        // Si l'API renvoie un objet unique, le transformer en tableau
        if (!Array.isArray(response)) {
          // Transformer l'objet en format CardFurniture
          const cardFurniture: CardFurniture = {
            name: response.name || '',
            price: response.price || '',
            imageUrl: response.imageUrl || '',
          };
          return [cardFurniture]; // Retourner un tableau avec un seul élément
        }
        // Si l'API renvoie déjà un tableau, le mapper au format CardFurniture[]
        return response.map((item: any) => ({
          name: item.name || '',
          price: item.price || '',
          imageUrl: item.imageUrl || '',
        }));
      })
    );
  }
}
