import { Routes } from '@angular/router';
import { DataPageComponent } from './components/data-page/data-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/data', pathMatch: 'full' },
  { path: 'data', component: DataPageComponent },
];
