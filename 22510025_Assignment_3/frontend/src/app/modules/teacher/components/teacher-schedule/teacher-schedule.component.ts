import { Component, OnInit } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { TeacherActionService } from '../../services/teacher-action.service';
import { Schedule, TeacherScheduleResponse } from './teacher-schedule.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-schedule',
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.css'],
})
export class TeacherScheduleComponent implements OnInit {
  user$: Observable<User | null>;
  schedule: Schedule[] | null = null;
  selectedSemester: string = 'Fall'; // Default selected semester

  constructor(
    private store: Store,
    private teacherActionService: TeacherActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.instructor_id) {
        this.fetchTeacherSchedule(user.instructor_id, this.selectedSemester);
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
          this.schedule = null;
        },
      });
  }

  onSemesterChange(semester: string) {
    this.selectedSemester = semester; // Update selected semester
    this.user$.subscribe((user) => {
      if (user?.instructor_id) {
        // Fetch the teacher schedule for the new semester
        this.fetchTeacherSchedule(user.instructor_id, semester);
      }
    });
  }
}
