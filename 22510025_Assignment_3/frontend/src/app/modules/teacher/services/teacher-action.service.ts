import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherProfileResponse } from '../components/teacher-profile/teacher-profile.model';
import { TeacherScheduleResponse } from '../components/teacher-schedule/teacher-schedule.model';
import { TeacherRecordsResponse } from '../components/teacher-records/teacher-records.model';
import { GradeAssignment } from '../components/assign-grades/assign-grade.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherActionService {
  private readonly API_URL = 'http://localhost:8000/api/v1/instructor';

  constructor(private http: HttpClient) {}

  private getHttpHeaders(instructorId: string) {
    return new HttpHeaders({ 'user-id': instructorId });
  }

  getTeacherInfo(instructorId: string): Observable<TeacherProfileResponse> {
    const headers = this.getHttpHeaders(instructorId);
    return this.http.get<TeacherProfileResponse>(`${this.API_URL}/info`, {
      headers,
    });
  }

  getTeacherCourseSchedule(
    instructorId: string,
    semester: string
  ): Observable<TeacherScheduleResponse> {
    const headers = this.getHttpHeaders(instructorId);
    return this.http.get<TeacherScheduleResponse>(
      `${this.API_URL}/schedule/${semester}`,
      {
        headers,
      }
    );
  }

  getTeacherCourseRecords(
    instructorId: string
  ): Observable<TeacherRecordsResponse> {
    const headers = this.getHttpHeaders(instructorId);
    return this.http.get<any>(`${this.API_URL}/students`, {
      headers,
    });
  }

  applyGrade(gradeAssignment: GradeAssignment): Observable<any> {
    return this.http.post(`${this.API_URL}/assign-grade`, gradeAssignment);
  }
}
