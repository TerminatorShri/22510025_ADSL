import {
  NewCourse,
  NewInstructor,
} from './../components/hod-records/hod-records.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HodProfileResponse } from '../components/hod-profile/hod-profile.model';
import {
  HodRecordsResponse,
  AddActionResponse,
} from '../components/hod-records/hod-records.model';

@Injectable({
  providedIn: 'root',
})
export class HodActionService {
  private readonly API_URL = 'http://localhost:8000/api/v1/hod';

  constructor(private http: HttpClient) {}

  private getHttpHeader(dept_name: string) {
    return new HttpHeaders({
      'user-id': dept_name,
    });
  }

  getHodProfile(dept_name: string): Observable<HodProfileResponse> {
    const headers = this.getHttpHeader(dept_name);
    return this.http.get<HodProfileResponse>(`${this.API_URL}/department`, {
      headers,
    });
  }

  getHodRecords(dept_name: string): Observable<HodRecordsResponse> {
    const headers = this.getHttpHeader(dept_name);
    return this.http.get<HodRecordsResponse>(`${this.API_URL}/courses`, {
      headers,
    });
  }

  addNewCourse(courseDetails: NewCourse): Observable<AddActionResponse> {
    const headers = this.getHttpHeader(courseDetails.deptName);
    return this.http.post<AddActionResponse>(
      `${this.API_URL}/add-course`,
      courseDetails,
      { headers }
    );
  }

  addNewInstructor(
    instructorDetails: NewInstructor
  ): Observable<AddActionResponse> {
    const headers = this.getHttpHeader(instructorDetails.deptName);
    return this.http.post<AddActionResponse>(
      `${this.API_URL}/add-instructor`,
      instructorDetails,
      { headers }
    );
  }

  updateInstructorSalary(
    instructorId: string,
    newSalary: number,
    deptName: string
  ): Observable<AddActionResponse> {
    const headers = this.getHttpHeader(deptName);
    return this.http.put<AddActionResponse>(
      `${this.API_URL}/update-salary`,
      { instructorId, newSalary },
      { headers }
    );
  }

  addFundsToDepartment(
    deptName: string,
    amount: number
  ): Observable<AddActionResponse> {
    const headers = this.getHttpHeader(deptName);
    return this.http.put<AddActionResponse>(
      `${this.API_URL}/add-funds`,
      { deptName, amount },
      { headers }
    );
  }

  assignInstructorToCourse(
    instructorId: string,
    courseId: string,
    secId: string,
    semester: string,
    year: number,
    deptName: string
  ): Observable<AddActionResponse> {
    const headers = this.getHttpHeader(deptName);
    return this.http.post<AddActionResponse>(
      `${this.API_URL}/assign-instructor`,
      { instructorId, courseId, secId, semester, year },
      { headers }
    );
  }

  assignInstructorToStudent(
    studentId: string,
    instructorId: string,
    deptName: string
  ): Observable<any> {
    const headers = this.getHttpHeader(deptName);
    console.log('assignInstructorToStudent', studentId, instructorId);
    return this.http.post(
      `${this.API_URL}/assign-advisor`,
      {
        studentId,
        instructorId,
      },
      { headers }
    );
  }
}
