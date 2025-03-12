// frontend/src/app/services/furniture.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Furniture } from '../models/furniture.model';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {
  private apiUrl = '/api/furnitures';

  constructor(private http: HttpClient) { }

  getFurnitures(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(this.apiUrl);
  }
}
