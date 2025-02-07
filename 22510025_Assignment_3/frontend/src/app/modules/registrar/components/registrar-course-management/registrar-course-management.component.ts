import { Component, OnInit } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RegistrarActionService } from '../../services/registrar-action.service';
import Swal from 'sweetalert2';
import {
  CourseWithoutTimeSlot,
  RegistrarCourseResponse,
  TimeSlotUpdate,
  TimeSlotUpdateResponse,
} from './registrar-course-management.model';

@Component({
  selector: 'app-registrar-course-management',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-course-management.component.html',
  styleUrl: './registrar-course-management.component.css',
})
export class RegistrarCourseManagementComponent implements OnInit {
  user$: Observable<User | null>;
  courses: CourseWithoutTimeSlot[] = [];
  timeSlotForm!: FormGroup;
  selectedCourse: CourseWithoutTimeSlot | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private registrarActionService: RegistrarActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.fetchCoursesWithoutTimeSlot();

    this.timeSlotForm = this.formBuilder.group({
      courseId: ['', Validators.required],
      secId: ['', Validators.required],
      semester: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(2000)]],
      timeSlotId: ['', Validators.required],
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      building: ['', Validators.required],
      roomNumber: ['', Validators.required],
    });
  }

  fetchCoursesWithoutTimeSlot(): void {
    this.registrarActionService.getNewCoursesWithoutTimeSlot().subscribe({
      next: (response: RegistrarCourseResponse) => {
        this.courses = response.data;
      },
      error: (error) => {
        Swal.fire('Error', error.error.message, 'error');
      },
    });
  }

  onSelectCourse(course: CourseWithoutTimeSlot): void {
    this.selectedCourse = course;
    this.timeSlotForm.patchValue({ courseId: course.course_id });
  }

  onAddTimeSlot() {
    if (this.timeSlotForm.valid) {
      const timeSlotData: TimeSlotUpdate = this.timeSlotForm.value;

      this.registrarActionService
        .updateTimeSlotForCourse(timeSlotData)
        .subscribe({
          next: (response: TimeSlotUpdateResponse) => {
            Swal.fire('Success', response.message, 'success');
            this.selectedCourse = null;
            this.timeSlotForm.reset();
            this.fetchCoursesWithoutTimeSlot();
          },
          error: (error) => {
            Swal.fire('Error', 'Failed to update time slot', 'error');
          },
        });
    }
  }

  cancel(): void {
    this.selectedCourse = null;
    this.timeSlotForm.reset();
  }
}
