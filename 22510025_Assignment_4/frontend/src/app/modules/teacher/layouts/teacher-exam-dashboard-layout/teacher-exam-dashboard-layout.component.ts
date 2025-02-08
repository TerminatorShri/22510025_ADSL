import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from '../../../../store/types/auth.model';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { logout } from '../../../../store/actions/auth.actions';
import { DialogBoxComponent } from '../../../../components/dialog-box/dialog-box.component';
import { DialogData } from '../../../../components/dialog-box/dialog-box.model';

@Component({
  selector: 'app-teacher-exam-dashboard-layout',
  imports: [RouterOutlet],
  templateUrl: './teacher-exam-dashboard-layout.component.html',
  styleUrl: './teacher-exam-dashboard-layout.component.css',
})
export class TeacherExamDashboardLayoutComponent {
  user$: Observable<User | null>;
  activeRoute: string | undefined = '';

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.user$ = this.store.select(selectUser);
    this.activeRoute = '';
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
    this.router.navigate(['/login']);
  }

  navigateTeacher(route: string | undefined) {
    const examId = this.route.snapshot.paramMap.get('id');
    console.log(examId);

    if (examId) {
      this.activeRoute = route;
      this.router.navigate([`/teacher/exam/${examId}/${route ? route : ''}`]);
    }
  }

  goBack() {
    this.router.navigate(['/teacher']);
  }
}
