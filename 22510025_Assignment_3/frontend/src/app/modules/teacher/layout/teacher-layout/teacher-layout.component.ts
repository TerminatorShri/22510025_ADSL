import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { logout } from './../../../../store/actions/auth.actions';
import { LogoutDialogComponent } from '../../../auth/components/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-teacher-layout',
  imports: [RouterOutlet],
  templateUrl: './teacher-layout.component.html',
  styleUrl: './teacher-layout.component.css',
})
export class TeacherLayoutComponent {
  activeRoute: string | undefined = '';

  constructor(
    private router: Router,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.activeRoute = '';
  }

  navigateTeacher(route: string | undefined) {
    this.activeRoute = route;
    this.router.navigate([`/teacher/${route}`]);
  }

  confirmLogout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.logout();
      }
    });
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/auth']);
  }
}
