import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../../../store/types/auth.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { StudentActionService } from '../../services/student-action.service';
import { ApiResponse } from '../../../../models/api.model';
import { UnattemptedExam } from './student-assigned-exams.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-assigned-exams',
  imports: [CommonModule],
  templateUrl: './student-assigned-exams.component.html',
  styleUrl: './student-assigned-exams.component.css',
})
export class StudentAssignedExamsComponent implements OnInit {
  user$: Observable<User | null>;
  unattemptedExams: UnattemptedExam[] = [];

  constructor(
    private store: Store,
    private studentActionService: StudentActionService,
    private router: Router
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.loadAssignedExams();
  }

  private loadAssignedExams(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.studentActionService.getAssignedExams(user.id).subscribe({
          next: (response: ApiResponse<UnattemptedExam[]>) => {
            console.log(
              '🚀 ~ StudentAssignedExamsComponent ~ this.studentActionService.getAssignedExams ~ response:',
              response
            );
            this.unattemptedExams = response.data;
          },
          error: (error: any) => {
            console.log(
              '🚀 ~ StudentAssignedExamsComponent ~ this.studentActionService.getAssignedExams ~ error:',
              error
            );
          },
        });
      }
    });
  }

  navigateToExam(examId: number) {
    this.router.navigate([`/student/exam/attempt/${examId}`]);
  }
}
