import { Component } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { TeacherActionService } from '../../services/teacher-action.service';
import { Schedule, TeacherScheduleResponse } from './teacher-schedule.model';

@Component({
  selector: 'app-teacher-schedule',
  imports: [CommonModule],
  templateUrl: './teacher-schedule.component.html',
  styleUrl: './teacher-schedule.component.css',
})
export class TeacherScheduleComponent {
  user$: Observable<User | null>;
  schedule: Schedule[] | null = null;

  constructor(
    private store: Store,
    private teacherActionService: TeacherActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.instructor_id) {
        this.fetchTeacherSchedule(user.instructor_id, 'Fall');
      }
    });
  }

  fetchTeacherSchedule(instructorId: string, semester: string) {
    this.teacherActionService
      .getTeacherCourseSchedule(instructorId, semester)
      .subscribe({
        next: (response: TeacherScheduleResponse) => {
          console.log(
            '🚀 ~ TeacherScheduleComponent ~ this.teacherActionService.getTeacherSchedule ~ response:',
            response
          );
          this.schedule = response.data;
        },
        error: (error) => {
          console.log('Error fetching teacher schedule:', error);
        },
      });
  }
}
