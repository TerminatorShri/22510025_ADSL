import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  readonly BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllReadings() {
    return this.http.get(`${this.BASE_URL}/readings`);
  }

  getStationWiseReadings(stationId: string) {
    return this.http.get(`${this.BASE_URL}/readings/${stationId}`);
  }
}
