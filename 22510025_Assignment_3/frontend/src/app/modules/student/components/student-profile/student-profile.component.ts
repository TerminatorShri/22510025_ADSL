import { Component, OnInit } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { StudentActionService } from '../../services/student-action.service';
import { StudentInfo, StudentProfileResponse } from './student-profile.model';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css',
})
export class StudentProfileComponent implements OnInit {
  user$: Observable<User | null>;
  studentInfo: StudentInfo | null = null;

  constructor(
    private store: Store,
    private studentActionService: StudentActionService
  ) {
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
        this.studentInfo = resposne.data;
        console.log(
          '🚀 ~ StudentProfileComponent ~ this.studentActionService.getStudentInfo ~ studentInfo:',
          this.studentInfo
        );
      },
      error: (err) => {
        console.error('Error fetching student info:', err);
      },
    });
  }
}
