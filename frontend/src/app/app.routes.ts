// frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page.component';
import { FurnitureDetailsPage } from './pages/furniture-details/furniture-details.component';
import { FurnitureManagementPage } from './pages/furniture-management/furniture-management.component';
import { FurnitureAddPage } from './pages/furniture-add/furniture-add.component';
import { FurnitureEditPage } from './pages/furniture-edit/furniture-edit.component';
import { RecrutementComponent } from './pages/recrutement/recrutement.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'furniture/:id', component: FurnitureDetailsPage },
  { path: 'furniture-management', component: FurnitureManagementPage },
  { path: 'furniture-add', component: FurnitureAddPage },
  { path: 'furniture-edit/:id', component: FurnitureEditPage },
  { path: 'recrutement', component: RecrutementComponent },

  // other routes as needed
];
