import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Injector, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CartService } from './cart-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<{ email: string; role: string; id: string } | null>(null);
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private injector: Injector,
  ) {}

  isLoggedIn = computed(() => this.user() !== null);
  isAdmin = computed(() => this.user()?.role === 'admin');

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

  getUserId() {
    return this.user()?.id;
  }

  checkAuth() {
    return this.http
      .get(`${this.apiUrl}/me`, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (response: any) => {
            this.user.set({ email: response.email, role: response.role, id: response.id });
            console.log('User authenticated:', response);
          },
        }),
      );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.user.set(null);
        localStorage.removeItem('cart');
        const cartService = this.injector.get(CartService);
        cartService.cart.set([]);
        this.router.navigate(['/']);
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
  address: string;
  paymentMethod: string;
}
