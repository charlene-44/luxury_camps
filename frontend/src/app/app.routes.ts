// frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page.component';
import { FurnitureDetailsPage } from './pages/furniture-details/furniture-details.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'furniture/:id', component: FurnitureDetailsPage },
  // other routes as needed
];
