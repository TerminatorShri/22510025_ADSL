import { Component } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { TeacherActionService } from '../../services/teacher-action.service';
import { StudentMarks, TeacherRecordsResponse } from './teacher-records.model';

@Component({
  selector: 'app-teacher-records',
  imports: [CommonModule],
  templateUrl: './teacher-records.component.html',
  styleUrl: './teacher-records.component.css',
})
export class TeacherRecordsComponent {
  user$: Observable<User | null>;
  teacherRecords: StudentMarks[] = [];

  constructor(
    private store: Store,
    private teacherActionService: TeacherActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.instructor_id) {
        this.fetchTeacherRecords(user.instructor_id);
      }
    });
  }

  fetchTeacherRecords(instructorId: string) {
    this.teacherActionService.getTeacherCourseRecords(instructorId).subscribe({
      next: (response: TeacherRecordsResponse) => {
        console.log(
          '🚀 ~ TeacherRecordsComponent ~ this.teacherActionService.getTeacherRecords ~ response:',
          response
        );
        this.teacherRecords = response.data;
      },
      error: (error) => {
        console.log('Error fetching teacher records:', error);
      },
    });
  }
}
