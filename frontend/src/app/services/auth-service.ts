import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserId() {
    return 1234;
  }
  isAdmin = signal(false);
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  isLoggedIn = signal(true);

  toggleRole() {
    this.isAdmin.update((value) => !value);
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/register`, user);
  }

  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(
      `${this.apiUrl}/login`,
      { email, password },
      { withCredentials: true },
    );
  }

  checkAuth() {
    return this.http.get(`${this.apiUrl}/me`, {
      withCredentials: true,
    });
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.isAdmin.set(false);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error logging out:', error);
      },
    });
  }
}

interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
}
