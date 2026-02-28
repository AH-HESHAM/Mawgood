import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { passwordMatched } from '../../validators/passwordValidator';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  userRegister: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userRegister = fb.group(
      {
        fullName: ['', [Validators.required, Validators.pattern('[A-Za-z]{4}')]],
        address: fb.group({
          city: [''],
          street: [''],
        }),
        password: ['', [Validators.required]],
        confirmedpassword: ['', [Validators.required]],
        referral: [''],
        other: [''],
      },
      { validators: [passwordMatched()] },
    );
  }
  get fullName() {
    return this.userRegister.get('fullName');
  }

  get password() {
    return this.userRegister.get('password');
  }
  get confirmedpassword() {
    return this.userRegister.get('confirmedpassword');
  }
  get referral() {
    return this.userRegister.get('referral');
  }
  get other() {
    return this.userRegister.get('other');
  }

  UpdateOtherInp() {
    if (this.referral?.value === 'other') {
      this.other?.setValidators([Validators.required]);
    } else {
      this.other?.clearValidators();
    }
    this.other?.updateValueAndValidity({ emitEvent: false });
  }
}
