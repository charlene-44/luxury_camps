// frontend/src/app/services/furniture.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Furniture } from '../models/furniture.model';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {
  private readonly apiUrl = '/cards/swsh3-136';

  constructor(private readonly http: HttpClient) { }

  getFurnitures(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(this.apiUrl);
  }
}
