import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentProfileResponse } from '../components/student-profile/student-profile.model';
import { StudentGradesResponse } from '../components/student-grades/student-grades.model';
import { StudentCourseResponse } from '../components/student-courses/student-courses.model';
import {
  StudentEligibleCoursesResponse,
  StudentCourseApplicationResponse,
} from '../components/student-applications/student-application.model';

@Injectable({
  providedIn: 'root',
})
export class StudentActionService {
  private readonly API_URL = 'http://localhost:8000/api/v1/student';

  constructor(private http: HttpClient) {}

  private getRequestHeaders(studentId: string): HttpHeaders {
    return new HttpHeaders({ 'user-id': studentId });
  }

  getStudentInfo(studentId: string): Observable<StudentProfileResponse> {
    const headers = this.getRequestHeaders(studentId);
    return this.http.get<StudentProfileResponse>(`${this.API_URL}/info`, {
      headers,
    });
  }

  getStudentGrades(
    studentId: string,
    semester: string
  ): Observable<StudentGradesResponse> {
    const headers = this.getRequestHeaders(studentId);
    return this.http.get<StudentGradesResponse>(
      `${this.API_URL}/grades/${semester}`,
      {
        headers,
      }
    );
  }

  getStudentCourses(
    studentId: string,
    semester: string
  ): Observable<StudentCourseResponse> {
    const headers = this.getRequestHeaders(studentId);
    return this.http.get<StudentCourseResponse>(
      `${this.API_URL}/courses/${semester}`,
      {
        headers,
      }
    );
  }

  getStudentApplications(
    studentId: string
  ): Observable<StudentEligibleCoursesResponse> {
    const headers = this.getRequestHeaders(studentId);
    return this.http.get<StudentEligibleCoursesResponse>(
      `${this.API_URL}/eligible-courses`,
      {
        headers,
      }
    );
  }

  applyForCourse(
    studentId: string,
    courseId: string,
    secId: string,
    semester: string,
    year: number
  ): Observable<StudentCourseApplicationResponse> {
    return this.http.post<StudentCourseApplicationResponse>(
      `${this.API_URL}/apply-course`,
      {
        studentId,
        courseId,
        secId,
        semester,
        year,
      }
    );
  }
}
