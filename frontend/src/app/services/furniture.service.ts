// frontend/src/app/services/furniture.service.ts

// services/furniture.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CardFurniture } from '../models/card-furniture';

// @Injectable({
//   providedIn: 'root'
// })
// export class FurnitureService {
//   private readonly apiUrl = 'assets/test.json';

//   constructor(private readonly http: HttpClient) { }

//   getFurnitures(): Observable<CardFurniture[]> {
//     return this.http.get<any>(this.apiUrl).pipe(
//       map(response => {
        // Adapter la réponse de l'API au format CardFurniture[]
        // Si l'API renvoie un objet unique, le transformer en tableau
        // if (!Array.isArray(response)) {
          // Transformer l'objet en format CardFurniture
          // const cardFurniture: CardFurniture = {
          //   name: response.name || '',
          //   price: response.price || '',
          //   image: response.image || '',
          //   description: response.description || '',
            
          // };
          // return [cardFurniture]; // Retourner un tableau avec un seul élément
        // }
        // Si l'API renvoie déjà un tableau, le mapper au format CardFurniture[]
//         return response.map((item: any) => ({
//           name: item.name || '',
//            price: item.price || '',
//           image: item.image || '',
//           description: item.description || '',
         
//         }));
//       })
//     );
//   }
// }

@Injectable({
  providedIn: 'root'
})

export class FurnitureService {
  private mockFurnitures: CardFurniture[] = [
    {
      name: "Fauteuil Élégance",
      price: 699.99,
      image: "https://tse2.mm.bing.net/th?id=OIP.5VQmvp25mU-zWRhj1XdYzQHaE8&pid=Api&P=0&h=180",
      description: "Un fauteuil confortable avec un design moderne et élégant, parfait pour votre salon."
    },
    {
      name: "Table Basse Minimaliste",
      price: 349.50,
      image: "https://tse2.mm.bing.net/th?id=OIP.5VQmvp25mU-zWRhj1XdYzQHaE8&pid=Api&P=0&h=180",
      description: "Une table basse au design épuré avec plateau en verre trempé et pieds en métal noir."
    },
    // Ajoutez les autres meubles ici...
  ];
  constructor() { }
  getFurnitures(): Observable<CardFurniture[]> {
    return of(this.mockFurnitures);
  }
}