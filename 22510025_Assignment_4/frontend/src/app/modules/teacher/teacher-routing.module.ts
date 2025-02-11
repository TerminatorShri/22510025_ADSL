import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { TeacherLayoutComponent } from './layouts/teacher-layout/teacher-layout.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { TeacherExamInfoComponent } from './components/teacher-exam-info/teacher-exam-info.component';
import { TeacherExamQuestionsComponent } from './components/teacher-exam-questions/teacher-exam-questions.component';
import { TeacherExamResultsComponent } from './components/teacher-exam-results/teacher-exam-results.component';
import { TeacherExamDashboardLayoutComponent } from './layouts/teacher-exam-dashboard-layout/teacher-exam-dashboard-layout.component';
import { AssignExamStundentsComponent } from './components/assign-exam-stundents/assign-exam-stundents.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'teacher' },
    children: [
      {
        path: '',
        component: TeacherDashboardComponent,
      },
      {
        path: 'exam/:id',
        component: TeacherExamDashboardLayoutComponent,
        children: [
          {
            path: '',
            component: TeacherExamInfoComponent,
          },
          {
            path: 'students',
            component: AssignExamStundentsComponent,
          },
          {
            path: 'questions',
            component: TeacherExamQuestionsComponent,
          },
          {
            path: 'results',
            component: TeacherExamResultsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
