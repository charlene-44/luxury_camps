// frontend/src/app/services/furniture.service.ts

// services/furniture.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { CardFurniture } from '../models/card-furniture';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {
  private apiUrl = '/api'; // Sera redirigé vers http://localhost:8080/api

  constructor(private http: HttpClient) { }

  getFurnitures(): Observable<CardFurniture[]> {
    return this.http.get<any[]>(`${this.apiUrl}/furnitures`).pipe(
      tap(response => {
        console.log('Réponse API brute:', response);
        // Afficher les images pour chaque meuble
        response.forEach(item => {
          console.log(`Images pour ${item.name}:`, item.images);
        });
      }),
      map(response => {
        return response.map(item => {
          const furniture = {
            name: item.name,
            price: item.price,
            image: item.imageUrl || '',
            description: item.description
          };
          console.log(`Meuble transformé ${furniture.name}:`, furniture);
          return furniture;
        });
      })
    );
  }

  getFurnitureById(id: number): Observable<CardFurniture> {
    return this.http.get<any>(`${this.apiUrl}/furniture/${id}`).pipe(
      map(item => ({
        name: item.name,
        price: item.price,
        image: item.images && item.images.length > 0 ? item.images[0].url : '',
        description: item.description
      }))
    );
  }
}

// @Injectable({
//   providedIn: 'root'
// })

// export class FurnitureService {
//   private apiUrl = '/api'; // Sera redirigé vers http://localhost:8080/api grâce au proxy

//   constructor(private http: HttpClient) { }

//   // Récupérer tous les meubles
//   getAllFurniture(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/furnitures`);
//   }

//   // Récupérer un meuble par son ID
//   getFurnitureById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/furniture/${id}`);
//   }

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

//   getFurnitures(): Observable<CardFurniture[]> {
//     return of(this.mockFurnitures);
//   }
// }