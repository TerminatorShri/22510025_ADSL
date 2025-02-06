import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { logout } from './../../../../store/actions/auth.actions';
import { LogoutDialogComponent } from '../../../auth/components/logout-dialog/logout-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hod-layout',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './hod-layout.component.html',
  styleUrl: './hod-layout.component.css',
})
export class HodLayoutComponent {
  activeRoute: string | undefined = '';

  constructor(
    private router: Router,
    private store: Store,
    private dialog: MatDialog
  ) {}

  navigateHod(route: string | undefined) {
    this.activeRoute = route;
    this.router.navigate([`/hod/${route}`]);
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
