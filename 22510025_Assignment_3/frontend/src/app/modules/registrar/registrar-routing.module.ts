import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarLayoutComponent } from './layout/registrar-layout/registrar-layout.component';
import { RegistrarStudentManagementComponent } from './components/registrar-student-management/registrar-student-management.component';
import { RegistrarCourseManagementComponent } from './components/registrar-course-management/registrar-course-management.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RegistrarLayoutComponent,
    canActivate: [AuthGuard],
    data: { role_id: 5 },
    children: [
      {
        path: '',
        component: RegistrarStudentManagementComponent,
      },
      {
        path: 'course-management',
        component: RegistrarCourseManagementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarRoutingModule {}
