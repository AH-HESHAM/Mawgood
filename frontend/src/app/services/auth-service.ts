import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdmin = signal(false);
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  toggleRole() {
    this.isAdmin.update(value => !value);
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/register`, user);
  }

  login({ email, password }: { email: string; password: string }): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(`${this.apiUrl}/login`, { email, password });
  }
}

interface IUser{
  fullName: string;
  email: string;
  password: string;
}