import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  userRegister: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.userRegister = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.authService.login(this.userRegister.value).subscribe({
      next: (response) => {
        console.log('User logged in successfully:', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error logging in user:', error);
        alert('Login failed. Please check your credentials and try again.');
      },
    });
  }
}
