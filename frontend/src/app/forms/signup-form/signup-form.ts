import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { passwordMatched } from '../../validators/passwordValidator';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})

export class Signup {
  userRegister: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userRegister = fb.group(
      {
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmedpassword: ['', [Validators.required]],
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

  Signup() {
    if (this.userRegister.valid) {
      console.log(this.userRegister.value);
    }
  }
}
