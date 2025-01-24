import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  getTables(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tables`);
  }

  getTableColumns(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/tables/${tableName}/columns`
    );
  }

  getData(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${tableName}`);
  }

  createRecord(tableName: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${tableName}`, data);
  }

  updateRecord(tableName: string, id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${tableName}/${id}`, data);
  }

  deleteRecord(tableName: string, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tableName}/${id}`);
  }
}
