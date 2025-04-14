import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaperInfoService {
  readonly BASE_URL = 'http://localhost:8000/api/papers';

  constructor(private http: HttpClient) {}

  getPaperInfo(paperId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/paper/${paperId}`);
  }

  getCitationPath(paperIdA: string, paperIdB: string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/check/${paperIdA}/cites/${paperIdB}`
    );
  }

  getPaperClassification(paperId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/classify/${paperId}`);
  }
}
