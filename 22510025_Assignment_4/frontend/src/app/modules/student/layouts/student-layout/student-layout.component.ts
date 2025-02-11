import { CommonModule } from '@angular/common';
import { selectUser } from './../../../../store/selectors/auth.selectors';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../store/types/auth.model';
import { Router, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { logout } from '../../../../store/actions/auth.actions';
import { DialogBoxComponent } from '../../../../components/dialog-box/dialog-box.component';
import { DialogData } from '../../../../components/dialog-box/dialog-box.model';

@Component({
  selector: 'app-student-layout',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css',
})
export class StudentLayoutComponent {
  user$: Observable<User | null>;
  activeRoute: string | undefined = '';

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.user$ = this.store.select(selectUser);
    this.activeRoute =
      this.router.url.split('/')[2] === undefined ? '' : 'completed';
  }

  openLogoutDialog(): void {
    const dialogData: DialogData = {
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      confirmText: 'Logout',
      cancelText: 'Cancel',
    };

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: dialogData,
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.logout();
      }
    });
  }

  private logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/auth']);
  }

  navigateStudent(route: string) {
    this.activeRoute = route;
    this.router.navigate([`/student/${route}`]);
  }
}
