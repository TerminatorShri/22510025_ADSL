import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  // Fetch all table names
  getTables(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tables`);
  }

  // Fetch column names for a specific table
  getTableColumns(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/tables/${tableName}/columns`
    );
  }

  // Fetch all data from a table
  getData(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${tableName}`);
  }

  // Fetch the primary key for a table
  getPrimaryKey(tableName: string): Observable<{ primaryKey: string }> {
    return this.http.get<{ primaryKey: string }>(
      `${this.apiUrl}/${tableName}/primary-key`
    );
  }

  // Create a new record
  createRecord(tableName: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${tableName}`, data);
  }

  // Update a record dynamically using the primary key
  updateRecord(
    tableName: string,
    primaryKey: string,
    primaryKeyValue: any,
    data: any
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${tableName}`, {
      primaryKey,
      primaryKeyValue,
      ...data,
    });
  }

  // Delete a record dynamically using the primary key
  deleteRecord(
    tableName: string,
    primaryKey: string,
    primaryKeyValue: any
  ): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${tableName}`, {
      body: { primaryKey, primaryKeyValue },
    });
  }
}
