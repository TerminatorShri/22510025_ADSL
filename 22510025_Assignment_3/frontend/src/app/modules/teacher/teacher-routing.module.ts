import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLayoutComponent } from './layout/teacher-layout/teacher-layout.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { TeacherScheduleComponent } from './components/teacher-schedule/teacher-schedule.component';
import { TeacherRecordsComponent } from './components/teacher-records/teacher-records.component';
import { AuthGuard } from '../../guards/auth.guard';
import { AssignGradesComponent } from './components/assign-grades/assign-grades.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherLayoutComponent,
    canActivate: [AuthGuard],
    data: { role_id: 3 },
    children: [
      { path: '', component: TeacherProfileComponent },
      {
        path: 'courses',
        component: TeacherScheduleComponent,
      },
      {
        path: 'records',
        component: TeacherRecordsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [AssignGradesComponent, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
