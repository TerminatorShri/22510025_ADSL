import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherActionService } from '../../services/teacher-action.service';
import { ApiResponse } from '../../../../models/api.model';
import { AssignedStudent } from './assign-exam-students.model';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-assign-exam-stundents',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assign-exam-stundents.component.html',
  styleUrl: './assign-exam-stundents.component.css',
})
export class AssignExamStundentsComponent implements OnInit {
  examId: number = 0;
  assignedStudents: AssignedStudent[] = [];
  assignStudentForm!: FormGroup;

  constructor(
    private teacherActionService: TeacherActionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.assignStudentForm = this.formBuilder.group({
      studentIds: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.examId = Number(params.get('id'));
      console.log('Extracted Exam ID:', this.examId);

      if (this.examId > 0) {
        this.loadAssignedStudents();
      } else {
        console.error('❌ Exam ID is invalid or missing');
      }
    });
  }

  loadAssignedStudents() {
    this.teacherActionService.getAssignedStudents(this.examId).subscribe({
      next: (response: ApiResponse<AssignedStudent[]>) => {
        console.log(
          '🚀 ~ AssignExamStundentsComponent ~ loadAssignedStudents ~ response:',
          response
        );
        this.assignedStudents = response.data;
      },
      error: (error: any) => {
        console.error('Error fetching assigned students:', error);
      },
    });
  }

  assignStudents() {
    if (this.assignStudentForm.invalid) {
      console.warn('🚨 Please enter student IDs.');
      return;
    }

    const studentIds = this.assignStudentForm.value.studentIds
      .split(' ')
      .map((id: string) => parseInt(id, 10))
      .filter((id: number) => !isNaN(id));

    this.teacherActionService
      .assignNewStudents(this.examId, studentIds)
      .subscribe({
        next: (response: ApiResponse<any>) => {
          console.log('✅ Students Assigned:', response);
          this.assignStudentForm.reset(); // Clear input field
          this.loadAssignedStudents(); // Refresh list
        },
        error: (error: any) => {
          console.error('❌ Error assigning students:', error);
        },
      });
  }
}
