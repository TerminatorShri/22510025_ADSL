import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TecherActionService } from '../../services/techer-action.service';
import { ApiResponse } from '../../../../models/api.model';
import { CurrentExam } from './teacher-exam-info.model';

@Component({
  selector: 'app-teacher-exam-info',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-exam-info.component.html',
  styleUrl: './teacher-exam-info.component.css',
})
export class TeacherExamInfoComponent implements OnInit {
  examId: number = 0;
  examForm!: FormGroup;
  isEditing: boolean = false;
  statusOptions: string[] = ['upcoming', 'ongoing', 'completed'];

  constructor(
    private route: ActivatedRoute,
    private teacherActionService: TecherActionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('id'));
    this.getExamInfo();
  }

  getExamInfo() {
    if (this.examId) {
      this.teacherActionService.getExamDetails(this.examId).subscribe({
        next: (response: ApiResponse<CurrentExam>) => {
          console.log(
            '🚀 ~ TeacherExamInfoComponent ~ this.teacherActionServices.getExamDetails ~ response:',
            response
          );
          this.initializeForm(response.data);
        },
        error: (error) => console.error('Error fetching exam details:', error),
      });
    }
  }

  initializeForm(exam: CurrentExam) {
    this.examForm = this.formBuilder.group({
      title: [exam.title, Validators.required],
      description: [exam.description, Validators.required],
      total_marks: [exam.total_marks, [Validators.required, Validators.min(1)]],
      start_time: [this.formatDateTime(exam.start_time), Validators.required],
      duration_minutes: [
        exam.duration_minutes,
        [Validators.required, Validators.min(1)],
      ],
      status: [exam.status, Validators.required],

      // ✅ Proper way to disable fields in Reactive Forms
      course_id: new FormControl({ value: exam.course_id, disabled: true }),
      course_name: new FormControl({ value: exam.course_name, disabled: true }),
      course_code: new FormControl({ value: exam.course_code, disabled: true }),
    });
  }

  formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toISOString().slice(0, 16); // Extract yyyy-MM-ddThh:mm
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.getExamInfo(); // Reset values if user cancels
    }
  }

  saveChanges() {
    if (this.examForm.valid) {
      const updatedExam = { ...this.examForm.value, examId: this.examId };

      this.teacherActionService.updateExamDetails(updatedExam).subscribe({
        next: (response) => {
          console.log('Exam updated successfully:', response);
          this.isEditing = false;
        },
        error: (error) => console.error('Error updating exam:', error),
      });
    }
  }
}
