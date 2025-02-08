import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../../../store/types/auth.model';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { StudentActionService } from '../../services/student-action.service';
import { ApiResponse } from '../../../../models/api.model';
import { AttemptedExamDetails } from './student-exam-result.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-exam-results',
  imports: [CommonModule],
  templateUrl: './student-exam-results.component.html',
  styleUrls: ['./student-exam-results.component.css'],
})
export class StudentExamResultsComponent implements OnInit {
  user$: Observable<User | null>;
  examId: number = 0;
  attemptedExamDetails: AttemptedExamDetails[] = [];

  constructor(
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private studentActionService: StudentActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    // Extract examId from the URL parameters
    this.examId = Number(
      this.activatedRoute.parent?.snapshot.paramMap.get('examId')
    );
    console.log('Exam ID: ', this.examId);
    this.loadExamResults();
  }

  loadExamResults(): void {
    this.user$.subscribe((user) => {
      if (user && this.examId) {
        // Fetch the exam results using the student's userId and examId
        this.studentActionService
          .getExamResult(user.id, this.examId)
          .subscribe({
            next: (response: ApiResponse<AttemptedExamDetails[]>) => {
              console.log('Attempted Exam Details:', response);
              this.attemptedExamDetails = response.data;
            },
            error: (error) => {
              console.error('Error fetching attempted exam details:', error);
            },
          });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/student/completed']);
  }
}
