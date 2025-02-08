import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TecherActionService } from '../../services/techer-action.service';
import { ApiResponse } from '../../../../models/api.model';

interface ExamResult {
  user_id: number;
  total_score: number;
  status: string;
}

@Component({
  selector: 'app-teacher-exam-results',
  imports: [CommonModule],
  templateUrl: './teacher-exam-results.component.html',
  styleUrl: './teacher-exam-results.component.css',
})
export class TeacherExamResultsComponent implements OnInit {
  examId: number = 0;
  examResults: ExamResult[] = [];

  constructor(
    private route: ActivatedRoute,
    private teacherActionService: TecherActionService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.examId = Number(params.get('id'));
      if (!isNaN(this.examId) && this.examId > 0) {
        this.getExamResults();
      } else {
        console.error('❌ Invalid examId:', this.examId);
      }
    });
  }

  getExamResults() {
    if (this.examId) {
      this.teacherActionService.getExamResults(this.examId).subscribe({
        next: (response: ApiResponse<ExamResult[]>) => {
          console.log('🚀 Exam Results Response:', response);
          this.examResults = response.data;
        },
        error: (error) => console.error('Error fetching exam results:', error),
      });
    }
  }
}
