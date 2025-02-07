import { Component, OnInit } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { HodActionService } from '../../services/hod-action.service';
import { Course, HodRecordsResponse, NewCourse } from './hod-records.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hod-records',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hod-records.component.html',
  styleUrl: './hod-records.component.css',
})
export class HodRecordsComponent implements OnInit {
  user$: Observable<User | null>;
  courses: Course[] = [];

  addCourseForm!: FormGroup;
  addInstructorForm!: FormGroup;

  constructor(
    private store: Store,
    private hodActionService: HodActionService,
    private formBuilder: FormBuilder
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.dept_name) {
        this.fetchHodRecords(user.dept_name);
      }
    });

    this.addCourseForm = this.formBuilder.group({
      courseId: ['', Validators.required],
      title: ['', Validators.required],
      credits: ['', [Validators.required, Validators.min(1)]],
    });

    // ✅ Initialize Add Instructor Form
    this.addInstructorForm = this.formBuilder.group({
      instructorId: ['', Validators.required],
      name: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(10000)]],
    });
  }

  fetchHodRecords(dept_name: string) {
    this.hodActionService.getHodRecords(dept_name).subscribe({
      next: (response: HodRecordsResponse) => {
        console.log(
          '🚀 ~ HodRecordsComponent ~ this.hodActionService.getHodRecords ~ response:',
          response
        );
        this.courses = response.data;
      },
      error: (err) => {
        console.error('Error fetching hod courses:', err);
      },
    });
  }

  onAddCourse(): void {
    if (this.addCourseForm.valid) {
      const newCourse = this.addCourseForm.value;
      this.user$.subscribe((user) => {
        if (user?.dept_name) {
          newCourse.deptName = user.dept_name;
          this.hodActionService.addNewCourse(newCourse).subscribe({
            next: (response) => {
              console.log('Course added successfully:', response);
              this.user$.subscribe((user) => {
                if (user?.dept_name) {
                  this.fetchHodRecords(user.dept_name);
                }
              });
              Swal.fire('Success', 'Course added successfully!', 'success');
            },
            error: (err) => {
              console.error('Error adding new course:', err);
              Swal.fire('Error', 'Failed to add course!', 'error');
            },
          });
        }
      });
      this.addCourseForm.reset();
    } else {
      Swal.fire('Error', 'Please fill all required fields correctly!', 'error');
    }
  }

  onAddInstructor(): void {
    console.log('Add Instructor Form:', this.addInstructorForm.value);
    if (this.addInstructorForm.valid) {
      const newInstructor = this.addInstructorForm.value;
      console.log('New Instructor:', newInstructor);

      this.user$.subscribe((user) => {
        if (user?.dept_name) {
          newInstructor.deptName = user.dept_name; // Ensure dept_name from user context is passed

          // Call the service to add the new instructor
          this.hodActionService.addNewInstructor(newInstructor).subscribe({
            next: (response) => {
              console.log('Instructor added successfully:', response);
              Swal.fire('Success', 'Instructor added successfully!', 'success');
            },
            error: (err) => {
              console.error('Error adding new instructor:', err);
              Swal.fire('Error', 'Failed to add instructor!', 'error');
            },
          });
        }
      });
      // Reset the form after submission
      this.addInstructorForm.reset();
    } else {
      Swal.fire('Error', 'Please fill all required fields correctly!', 'error');
    }
  }
}
