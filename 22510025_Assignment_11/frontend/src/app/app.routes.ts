import { Routes } from '@angular/router';
import { PaperDashboardComponent } from './components/paper-dashboard/paper-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: PaperDashboardComponent,
  },
];
