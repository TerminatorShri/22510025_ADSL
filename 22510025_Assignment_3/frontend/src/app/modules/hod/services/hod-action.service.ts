import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HodProfileResponse } from '../components/hod-profile/hod-profile.model';
import { HodRecordsResponse } from '../components/hod-records/hod-records.model';

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
}
