import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HodLayoutComponent } from './layout/hod-layout/hod-layout.component';
import { HodProfileComponent } from './components/hod-profile/hod-profile.component';
import { HodRecordsComponent } from './components/hod-records/hod-records.component';
import { HodManagementComponent } from './components/hod-management/hod-management.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HodLayoutComponent,
    canActivate: [AuthGuard],
    data: { role_id: 2 },
    children: [
      { path: '', component: HodProfileComponent },
      { path: 'records', component: HodRecordsComponent },
      { path: 'manage', component: HodManagementComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HodRoutingModule {}
