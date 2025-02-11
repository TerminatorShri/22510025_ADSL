import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../models/api.model';
import { UnattemptedExam } from '../components/student-assigned-exams/student-assigned-exams.model';
import { CompletedExam } from '../components/student-completed-exams/student-completed-exams.model';
import { AttemptedExamDetails } from '../components/student-exam-results/student-exam-result.model';
import {
  ExamDetails,
  ExamQuestion,
} from '../components/student-exam-attempt/student-exam-attempt.model';
import { SubmittedAnswer } from '../components/student-exam-results/student-exam-result.model';

@Injectable({
  providedIn: 'root',
})
export class StudentActionService {
  private readonly API_URL = 'http://localhost:8000/api/v1/student';
  constructor(private http: HttpClient) {}

  getAssignedExams(
    studentId: number
  ): Observable<ApiResponse<UnattemptedExam[]>> {
    return this.http.get<ApiResponse<UnattemptedExam[]>>(
      `${this.API_URL}/${studentId}/unattempted-exams`
    );
  }

  getCompletedExams(
    studentId: number
  ): Observable<ApiResponse<CompletedExam[]>> {
    return this.http.get<ApiResponse<CompletedExam[]>>(
      `${this.API_URL}/${studentId}/attempted-exams`
    );
  }

  getExamResult(
    studentId: number,
    examId: number
  ): Observable<ApiResponse<AttemptedExamDetails[]>> {
    return this.http.get<ApiResponse<AttemptedExamDetails[]>>(
      `${this.API_URL}/${studentId}/exam/${examId}/details`
    );
  }

  getCurrentExamQuestions(
    examId: number
  ): Observable<
    ApiResponse<{ examDetails: ExamDetails; examQuestions: ExamQuestion[] }>
  > {
    return this.http.get<
      ApiResponse<{ examDetails: ExamDetails; examQuestions: ExamQuestion[] }>
    >(`${this.API_URL}/exam/${examId}/questions`);
  }

  submitExamAnswers(
    attemptId: number,
    answers: SubmittedAnswer[]
  ): Observable<ApiResponse<{ score: number; status: string }>> {
    return this.http.post<ApiResponse<{ score: number; status: string }>>(
      `${this.API_URL}/submit-exam`,
      {
        attemptId,
        answers,
      }
    );
  }
}
