import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  NewStudent,
  AddActionResponse,
} from '../components/registrar-student-management/registrar-student-management.model';
import {
  RegistrarCourseResponse,
  TimeSlotUpdate,
  TimeSlotUpdateResponse,
} from '../components/registrar-course-management/registrar-course-management.model';
@Injectable({
  providedIn: 'root',
})
export class RegistrarActionService {
  private readonly API_URL: string = 'http://localhost:8000/api/v1/registrar';

  constructor(private http: HttpClient) {}

  addNewStudent(newStudent: NewStudent): Observable<AddActionResponse> {
    return this.http.post<AddActionResponse>(
      `${this.API_URL}/add-student`,
      newStudent
    );
  }

  getNewCoursesWithoutTimeSlot(): Observable<RegistrarCourseResponse> {
    return this.http.get<RegistrarCourseResponse>(
      `${this.API_URL}/new-courses`
    );
  }

  updateTimeSlotForCourse(
    data: TimeSlotUpdate
  ): Observable<TimeSlotUpdateResponse> {
    return this.http.post<TimeSlotUpdateResponse>(
      `${this.API_URL}/update-time-slot`,
      data
    );
  }
}
