import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersSubject.asObservable();

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Load once at app start
  loadUsers() {
    this.http.get<IUser[]>(this.apiUrl, { withCredentials: true }).subscribe((data) => this.usersSubject.next(data));
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
}
