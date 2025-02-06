import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLayoutComponent } from './layout/student-layout/student-layout.component';
import { StudentApplicationsComponent } from './components/student-applications/student-applications.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentGradesComponent } from './components/student-grades/student-grades.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    canActivate: [AuthGuard],
    data: { role_id: 4 },
    children: [
      { path: '', component: StudentProfileComponent },
      { path: 'grades', component: StudentGradesComponent },
      { path: 'courses', component: StudentCoursesComponent },
      { path: 'application', component: StudentApplicationsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
