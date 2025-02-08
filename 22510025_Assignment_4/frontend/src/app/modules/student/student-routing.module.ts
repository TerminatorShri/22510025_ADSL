import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { StudentAssignedExamsComponent } from './components/student-assigned-exams/student-assigned-exams.component';
import { StudentCompletedExamsComponent } from './components/student-completed-exams/student-completed-exams.component';
import { StudentExamDashboardLayoutComponent } from './layouts/student-exam-dashboard-layout/student-exam-dashboard-layout.component';
import { StudentExamAttemptComponent } from './components/student-exam-attempt/student-exam-attempt.component';
import { StudentExamResultsComponent } from './components/student-exam-results/student-exam-results.component';

const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'student' },
    children: [
      {
        path: '',
        component: StudentAssignedExamsComponent,
      },
      {
        path: 'completed',
        component: StudentCompletedExamsComponent,
      },
    ],
  },
  {
    path: 'exam/:examId',
    component: StudentExamDashboardLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'student' },
    children: [
      {
        path: 'attempt',
        component: StudentExamAttemptComponent,
      },
      {
        path: 'completed',
        component: StudentExamResultsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
