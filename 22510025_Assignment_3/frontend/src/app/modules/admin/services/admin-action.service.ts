import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  AdminActionResponse,
  NewBuildingRoom,
  NewDepartment,
} from '../components/admin-management/admin-management.model';

@Injectable({
  providedIn: 'root',
})
export class AdminActionService {
  private readonly API_URL: string = 'http://localhost:8000/api/v1/admin';

  constructor(private http: HttpClient) {}

  addDepartment(data: NewDepartment): Observable<AdminActionResponse> {
    return this.http.post<AdminActionResponse>(
      `${this.API_URL}/add-department`,
      data
    );
  }

  addBuildingAndRoom(data: NewBuildingRoom): Observable<AdminActionResponse> {
    return this.http.post<AdminActionResponse>(
      `${this.API_URL}/add-building-room`,
      data
    );
  }
}
