import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'https://restaurant-app-api-rho.vercel.app/api/users';

  // Register
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  // Login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
        }
      }),
    );
  }

  // Get Profile
  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
  }

  // Check if Logged In
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
