// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page.component';
import { FurnitureDetailsComponent } from './pages/furniture-details/furniture-details.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'furniture/:id', component: FurnitureDetailsComponent },
  // other routes as needed
];
