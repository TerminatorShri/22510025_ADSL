import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../../../store/types/auth.model';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { ApiResponse } from '../../../../models/api.model';
import { StudentActionService } from '../../services/student-action.service';
import { CompletedExam } from './student-completed-exams.model';

@Component({
  selector: 'app-student-completed-exams',
  imports: [CommonModule],
  templateUrl: './student-completed-exams.component.html',
  styleUrl: './student-completed-exams.component.css',
})
export class StudentCompletedExamsComponent implements OnInit {
  user$: Observable<User | null>;
  completedExams: CompletedExam[] = [];

  constructor(
    private store: Store,
    private router: Router,
    private studentActionService: StudentActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.loadCompletedExams();
  }

  private loadCompletedExams(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.studentActionService.getCompletedExams(user.id).subscribe({
          next: (response: ApiResponse<CompletedExam[]>) => {
            console.log(
              '🚀 ~ StudentCompletedExamsComponent ~ this.studentActionService.getCompletedExams ~ response:',
              response
            );
            this.completedExams = response.data;
          },
          error: (error: any) => {
            console.log(
              '🚀 ~ StudentCompletedExamsComponent ~ this.studentActionService.getCompletedExams ~ error:',
              error
            );
          },
        });
      }
    });
  }

  viewExamDetails(examId: number): void {
    this.router.navigate([`/student/exam/${examId}/completed`]);
  }
}
