import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUserInfo } from '../../../models/iuser-info';

@Component({
  selector: 'app-guest-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './guest-checkout-page.html',
  styleUrl: './guest-checkout-page.css',
})
export class GuestCheckoutPage implements OnInit {
  checkoutForm!: FormGroup;
  isConfirmed = false;
  guestData!: IUserInfo;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      recipientName: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['Credit Card', Validators.required],
    });
  }

  confirmInfo() {
    if (this.checkoutForm.valid) {
      this.guestData = this.checkoutForm.value;
      this.isConfirmed = true;
      console.log('Guest info confirmed:', this.guestData);
    }
  }

  editInfo() {
    this.isConfirmed = false;
  }

  onPlaceOrder() {
    console.log('Guest placing order with:', this.guestData);
    // Logic for placing the order
  }
}
