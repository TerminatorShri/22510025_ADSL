import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { UnauthorizedComponent } from './modules/auth/components/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('./modules/teacher/teacher.module').then((m) => m.TeacherModule),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./modules/student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
];
