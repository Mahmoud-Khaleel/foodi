import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserModel } from '../models/UserModel';
import { AppConstants } from '../core/constants/constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private usersUrl = `${AppConstants.baseUrl}/users`;

  // Register
  register(userData: any): Observable<any> {
    return this.http.post(`${this.usersUrl}/signup`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.usersUrl}/login`, credentials).pipe(
      tap((res: any) => {
        const token = res?.data?.token;
        if (token) {
          localStorage.setItem('token', token);
          this.user = res?.data;
        }
        this.getProfile();
      }),
    );
  }

  user: UserModel | null = null;
  errorGettingUserData: string | null = null;
  // Get Profile
  getProfile() {
    this.http.get(`${this.usersUrl}/me`).subscribe({
      next: (res: any) => {
        console.log(`This is the user data: ${JSON.stringify(res?.data)}`);
        this.user = res?.['data'];
        this.errorGettingUserData = null;
      },
      error: (err: any) => {
        this.errorGettingUserData = err['error']['message'];
        console.log(`Error getting user data: ${this.errorGettingUserData}`);
        this.user = null;
      },
    });
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    this.getProfile();
  }

  // Check if Logged In
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
