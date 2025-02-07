import { Component, OnInit } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { StudentActionService } from '../../services/student-action.service';
import { Grade, StudentGradesResponse } from './student-grades.model';

@Component({
  selector: 'app-student-grades',
  imports: [CommonModule],
  templateUrl: './student-grades.component.html',
  styleUrl: './student-grades.component.css',
})
export class StudentGradesComponent implements OnInit {
  user$: Observable<User | null>;
  grades: Grade[] = [];

  constructor(
    private store: Store,
    private studentActionService: StudentActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.student_id) {
        this.fetchStudentGrades(user.student_id);
      }
    });
  }

  fetchStudentGrades(studentId: string) {
    this.studentActionService.getStudentGrades(studentId, 'Fall').subscribe({
      next: (response: StudentGradesResponse) => {
        console.log(
          '🚀 ~ StudentGradesComponent ~ fetchStudentGrades ~ response:',
          response
        );
        this.grades = response.data;
        console.log('Grades:', this.grades);
      },
      error: (err) => {
        console.error('Error fetching student grades:', err);
      },
    });
  }
}
