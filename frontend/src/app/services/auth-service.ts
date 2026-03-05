import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdmin = signal(false);

  toggleRole() {
    this.isAdmin.update(value => !value);
  }
}
