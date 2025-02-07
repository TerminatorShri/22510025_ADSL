import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GradeAssignment, GradesCourseInput } from './assign-grade.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TeacherActionService } from '../../services/teacher-action.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assign-grades',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './assign-grades.component.html',
  styleUrl: './assign-grades.component.css',
})
export class AssignGradesComponent implements OnInit {
  @Input() course!: GradesCourseInput;
  @Output() close = new EventEmitter<void>();
  @Output() gradeAssigned = new EventEmitter<void>();
  gradeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private teacherActionService: TeacherActionService
  ) {}

  ngOnInit(): void {
    this.gradeForm = this.formBuilder.group({
      studentId: ['', Validators.required],
      grade: ['', Validators.required],
      courseId: [this.course?.course_id || '', Validators.required],
      secId: [this.course?.sec_id || '', Validators.required],
      semester: [this.course?.semester || '', Validators.required],
      year: [
        this.course?.year || new Date().getFullYear(),
        Validators.required,
      ],
    });
  }

  onSubmit(): void {
    if (this.gradeForm.invalid) {
      console.error(
        'Form is invalid. Please fill all required fields.',
        this.gradeForm.errors
      );
      return;
    }

    const gradeAssignment: GradeAssignment = this.gradeForm.value;
    console.log('🚀 Submitting Grade:', gradeAssignment);

    this.teacherActionService.applyGrade(gradeAssignment).subscribe({
      next: (response) => {
        console.log('✅ Grade Successfully Assigned:', response);
        Swal.fire({
          title: 'Success',
          text: 'The student grade has been successfully assigned.',
          icon: 'success',
        });

        // Reset form after successful submission
        this.gradeForm.reset();

        // Emit gradeAssigned event to refresh the records
        this.gradeAssigned.emit();

        // Emit close event to hide the form
        this.close.emit();
      },
      error: (err) => {
        console.error('❌ Error assigning grade:', err);
        Swal.fire({
          title: 'Error',
          text: 'Failed to assign grade. Please try again.',
          icon: 'error',
        });
      },
    });
  }

  cancel(): void {
    this.close.emit();
  }
}
