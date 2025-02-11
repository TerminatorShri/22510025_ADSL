import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../models/api.model';
import {
  CreateExamRequest,
  CreateExamResponse,
  TeacherExam,
} from '../components/teacher-dashboard/teacher-dashboard.model';
import { CurrentExam } from '../components/teacher-exam-info/teacher-exam-info.model';
import { ExamQuestion } from '../components/teacher-exam-questions/teacher-exam-questions.model';
import { ExamResult } from '../components/teacher-exam-results/teacher-exam-result.model';
import { AssignedStudent } from '../components/assign-exam-stundents/assign-exam-students.model';
import { AddQuestionRequest } from '../components/teacher-exam-questions/teacher-exam-questions.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherActionService {
  private readonly API_URL: string = 'http://localhost:8000/api/v1/teacher';

  constructor(private http: HttpClient) {}

  getTeacherExams(teacherId: number): Observable<ApiResponse<TeacherExam[]>> {
    return this.http.get<ApiResponse<TeacherExam[]>>(
      `${this.API_URL}/${teacherId}/exams`
    );
  }

  getExamDetails(examId: number): Observable<ApiResponse<CurrentExam>> {
    return this.http.get<ApiResponse<CurrentExam>>(
      `${this.API_URL}/exam/${examId}`
    );
  }

  getExamQuestions(examId: number): Observable<ApiResponse<ExamQuestion[]>> {
    return this.http.get<ApiResponse<ExamQuestion[]>>(
      `${this.API_URL}/exam/${examId}/questions`
    );
  }

  getExamResults(examId: number): Observable<ApiResponse<ExamResult[]>> {
    return this.http.get<ApiResponse<ExamResult[]>>(
      `${this.API_URL}/exam/${examId}/results`
    );
  }

  createExam(
    examData: CreateExamRequest
  ): Observable<ApiResponse<CreateExamResponse>> {
    return this.http.post<ApiResponse<CreateExamResponse>>(
      `${this.API_URL}/create`,
      examData
    );
  }

  updateExamDetails(
    updatedExam: Partial<CurrentExam>
  ): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      `${this.API_URL}/exam/${updatedExam.id}`,
      updatedExam
    );
  }

  getAssignedStudents(
    examId: number
  ): Observable<ApiResponse<AssignedStudent[]>> {
    return this.http.get<ApiResponse<AssignedStudent[]>>(
      `${this.API_URL}/exam/${examId}/assigned-students`
    );
  }

  assignNewStudents(examId: number, studentIds: number[]): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/exam/assign-students`, {
      examId,
      studentIds,
    });
  }

  addQuestionToExam(
    questionData: AddQuestionRequest
  ): Observable<ApiResponse<ExamQuestion[]>> {
    return this.http.post<ApiResponse<ExamQuestion[]>>(
      `${this.API_URL}/exam/add-question`,
      {
        ...questionData,
      }
    );
  }
}
