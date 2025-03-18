// frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page.component';
import { FurnitureDetailsPage } from './pages/furniture-details/furniture-details.component';
import { FurnitureManagementPage } from './pages/furniture-management/furniture-management.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'furniture/:id', component: FurnitureDetailsPage },
  { path: 'furniture-management', component: FurnitureManagementPage },
  // other routes as needed
];
