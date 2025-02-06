import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly API_URL = 'http://localhost:8000/api/v1/user';

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, {
      username,
      password,
    });
  }
}
