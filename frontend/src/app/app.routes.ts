// frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page.component';
import { FurnitureDetailsPage } from './pages/furniture-details/furniture-details.component';
import { FurnitureAdminPage } from './pages/furniture-admin/furniture-admin.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'furniture/:id', component: FurnitureDetailsPage },
  { path: 'admin/furniture', component: FurnitureAdminPage },
  // other routes as needed
];
