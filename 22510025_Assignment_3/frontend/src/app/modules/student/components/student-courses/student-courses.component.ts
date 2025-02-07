import { Component, OnInit } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { StudentActionService } from '../../services/student-action.service';
import { Course, StudentCourseResponse } from './student-courses.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css',
})
export class StudentCoursesComponent implements OnInit {
  user$: Observable<User | null>;
  courses: Course[] | null = [];
  selectedSemester: string = 'Fall';
  studentId: string | null = null;

  constructor(
    private store: Store,
    private studentActionService: StudentActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.student_id) {
        this.studentId = user.student_id;
        this.fetchStudentCourses(this.studentId, this.selectedSemester);
      }
    });
  }

  onSemesterChange() {
    if (this.studentId) {
      this.fetchStudentCourses(this.studentId, this.selectedSemester);
    }
  }

  fetchStudentCourses(studentId: string, semester: string) {
    this.studentActionService.getStudentCourses(studentId, semester).subscribe({
      next: (response: StudentCourseResponse) => {
        this.courses = response.data;
        console.log('Fetched courses:', this.courses);
      },
      error: (err) => {
        console.error('Error fetching student courses:', err);
        this.courses = [];
      },
    });
  }
}
