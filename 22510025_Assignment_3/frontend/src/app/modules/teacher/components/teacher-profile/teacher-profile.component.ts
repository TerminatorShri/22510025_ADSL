import { Component, OnInit } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { TeacherActionService } from '../../services/teacher-action.service';
import {
  Course,
  Teacher,
  TeacherProfileResponse,
} from './teacher-profile.model';

@Component({
  selector: 'app-teacher-profile',
  imports: [CommonModule],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css',
})
export class TeacherProfileComponent implements OnInit {
  user$: Observable<User | null>;
  courses: Course[] | null = [];
  teacherInfo: Teacher | null = null;

  constructor(
    private store: Store,
    private teacherActionService: TeacherActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.instructor_id) {
        this.fetchTeacherInfo(user.instructor_id);
      }
    });
  }

  fetchTeacherInfo(instructorId: string) {
    this.teacherActionService.getTeacherInfo(instructorId).subscribe({
      next: (response: TeacherProfileResponse) => {
        console.log(
          '🚀 ~ TeacherProfileComponent ~ this.teacherActionService.getTeacherInfo ~ response:',
          response
        );
        this.teacherInfo = response.data;
        this.courses = response.data.courses;
      },
      error: (err) => {
        console.error('Error fetching teacher info:', err);
      },
    });
  }
}
