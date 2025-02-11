import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { logout } from './../../../../store/actions/auth.actions';
import { LogoutDialogComponent } from '../../../auth/components/logout-dialog/logout-dialog.component';
import { Observable } from 'rxjs';
import { User } from '../../../../store/types/auth.model';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { StudentActionService } from '../../services/student-action.service';
import {
  StudentInfo,
  StudentProfileResponse,
} from '../../components/student-profile/student-profile.model';

@Component({
  selector: 'app-student-layout',
  imports: [RouterOutlet],
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css'],
})
export class StudentLayoutComponent {
  user$: Observable<User | null>;
  activeRoute: string | undefined = '';
  user: StudentInfo | null = null;

  constructor(
    private router: Router,
    private store: Store,
    private dialog: MatDialog,
    private studentActionService: StudentActionService
  ) {
    this.activeRoute = '';
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.student_id) {
        this.fetchStudentInfo(user.student_id);
      }
    });
  }

  fetchStudentInfo(studentId: string) {
    this.studentActionService.getStudentInfo(studentId).subscribe({
      next: (resposne: StudentProfileResponse) => {
        this.user = resposne.data;
      },
      error: (err) => {
        console.error('Error fetching student info:', err);
      },
    });
  }

  navigateStudent(route: string | undefined) {
    this.activeRoute = route;
    this.router.navigate([`/student/${route}`]);
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

  handleDropdownChange(event: any) {
    this.confirmLogout();
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/auth']);
  }
}
