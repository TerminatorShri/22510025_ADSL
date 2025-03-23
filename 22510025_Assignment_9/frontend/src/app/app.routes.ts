import { Routes } from '@angular/router';
import { DatabaseCrudComponent } from './components/database-crud/database-crud.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/database',
    pathMatch: 'full',
  },
  {
    path: 'database',
    component: DatabaseCrudComponent,
  },
];
