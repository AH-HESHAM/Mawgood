import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../../../services/user-info-service';
import { IUserInfo } from '../../../models/iuser-info';

@Component({
  selector: 'app-user-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-checkout-page.html',
  styleUrl: './user-checkout-page.css',
})
export class UserCheckoutPage implements OnInit {
  checkoutForm!: FormGroup;
  isEditing = false;

  // Mock initial data - in a real app, this would come from a UserService or AuthService
  userData!: IUserInfo;

  constructor(
    private fb: FormBuilder,
    private userService: UserInfoService,
  ) {}

  ngOnInit(): void {
    this.userData = this.userService.getUserInfo();
    this.checkoutForm = this.fb.group({
      recipientName: [this.userData.recipientName, Validators.required],
      address: [this.userData.address, Validators.required],
      paymentMethod: [this.userData.paymentMethod, Validators.required],
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.checkoutForm.patchValue(this.userData);
    }
  }

  saveData() {
    if (this.checkoutForm.valid) {
      this.userData = this.checkoutForm.value;
      this.isEditing = false;
      console.log('Updated user data for order:', this.userData);
      // Here you would typically call a service to update the order data
    }
  }

  onPlaceOrder() {
    console.log('Placing order with:', this.userData);
    // Logic for placing the order
  }
}
