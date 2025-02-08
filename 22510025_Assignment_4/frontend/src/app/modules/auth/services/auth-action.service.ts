import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../components/login/login.model';
@Injectable({
  providedIn: 'root',
})
export class AuthActionService {
  private readonly API_URL = 'http://localhost:8000/api/v1/user';

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, {
      username,
      password,
    });
  }
}
