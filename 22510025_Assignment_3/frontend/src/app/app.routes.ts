import { Routes } from '@angular/router';
import { LoginFormComponent } from './modules/auth/components/login-form/login-form.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: LoginFormComponent,
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./modules/student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('./modules/teacher/teacher.module').then((m) => m.TeacherModule),
  },
  {
    path: 'hod',
    loadChildren: () =>
      import('./modules/hod/hod.module').then((m) => m.HodModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'registrar',
    loadChildren: () =>
      import('./modules/registrar/registrar.module').then(
        (m) => m.RegistrarModule
      ),
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
];
