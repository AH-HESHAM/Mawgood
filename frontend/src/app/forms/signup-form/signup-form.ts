import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { passwordMatched } from '../../validators/passwordValidator';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})

export class Signup {
  userRegister: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.userRegister = fb.group(
      {
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmedpassword: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        role: ['', [Validators.required]],
      },
      { validators: [passwordMatched()] },
    );
  }

  get fullName() {
    return this.userRegister.get('fullName');
  }

  get email() {
    return this.userRegister.get('email');
  }

  get password() {
    return this.userRegister.get('password');
  }
  get confirmedpassword() {
    return this.userRegister.get('confirmedpassword');
  }
  get phoneNumber() {
    return this.userRegister.get('phoneNumber');
  }
  get role() {
    return this.userRegister.get('role');
  }

  Signup() {
    if (this.userRegister.valid) {
      this.authService.register(this.userRegister.value).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error registering user:', error);
        },
      });
    }
  }
}
