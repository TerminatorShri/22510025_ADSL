import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { logout } from './../../../../store/actions/auth.actions';
import { LogoutDialogComponent } from '../../../auth/components/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-registrar-layout',
  imports: [RouterOutlet],
  templateUrl: './registrar-layout.component.html',
  styleUrl: './registrar-layout.component.css',
})
export class RegistrarLayoutComponent {
  activeRoute: string | undefined = '';

  constructor(
    private router: Router,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.activeRoute = '';
  }

  navigateRegistrar(route: string | undefined) {
    this.activeRoute = route;
    this.router.navigate([`/registrar/${route}`]);
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
