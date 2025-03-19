import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FurnitureAdmin } from '../models/furniture-admin.model';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {
  private apiUrl = 'api/furnitures'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) { }

  getFurnitureList(): Observable<FurnitureAdmin[]> {
    return this.http.get<FurnitureAdmin[]>(this.apiUrl);
  }

  updateFurniture(furniture: FurnitureAdmin): Observable<FurnitureAdmin> {
    return this.http.put<FurnitureAdmin>(`${this.apiUrl}/${furniture.id}`, furniture);
  }

  deleteFurniture(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}