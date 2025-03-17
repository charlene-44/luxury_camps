// frontend/src/app/services/furniture.service.ts

// services/furniture.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CardFurniture } from '../models/card-furniture.model';

@Injectable({
  providedIn: 'root',
})
export class FurnitureService {
  private readonly apiUrl = 'http://localhost:8080/api/furnitures';

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

// @Injectable({
//   providedIn: 'root'
// })

// export class FurnitureService {
//   private mockFurnitures: CardFurniture[] = [
//     {
//       name: "Fauteuil Élégance",
//       price: 699.99,
//       image: "https://tse2.mm.bing.net/th?id=OIP.5VQmvp25mU-zWRhj1XdYzQHaE8&pid=Api&P=0&h=180",
//       description: "Un fauteuil confortable avec un design moderne et élégant, parfait pour votre salon."
//     },
//     {
//       name: "Table Basse Minimaliste",
//       price: 349.50,
//       image: "https://tse2.mm.bing.net/th?id=OIP.5VQmvp25mU-zWRhj1XdYzQHaE8&pid=Api&P=0&h=180",
//       description: "Une table basse au design épuré avec plateau en verre trempé et pieds en métal noir."
//     },
//     {
//       name: "Table Basse Minimaliste",
//       price: 349.50,
//       image: "https://tse2.mm.bing.net/th?id=OIP.5VQmvp25mU-zWRhj1XdYzQHaE8&pid=Api&P=0&h=180",
//       description: "Une table basse au design épuré avec plateau en verre trempé et pieds en métal noir."
//     },

//   ];
//   constructor() { }
//   getFurnitures(): Observable<CardFurniture[]> {
//     return of(this.mockFurnitures);
//   }
// }
