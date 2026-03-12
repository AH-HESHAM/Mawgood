import { Component, inject, OnInit, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInfoService } from '../../services/user-info-service';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { Payment } from '../../services/payment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-checkout-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-checkout-page.html',
  styleUrl: './user-checkout-page.css',
})
export class UserCheckoutPage implements OnInit {
  private fb = inject(FormBuilder);
  private userInfoService = inject(UserInfoService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private paymentService = inject(Payment);
  private router = inject(Router);

  checkoutForm!: FormGroup;
  isGuest = computed(() => this.authService.user()?.role === 'guest');

  ngOnInit(): void {
    const userData = this.isGuest() ? this.userInfoService.getUserInfo() : null;

    this.checkoutForm = this.fb.group({
      recipientName: [userData?.recipientName || '', Validators.required],
      phoneNumber: [
        userData?.phoneNumber || '',
        [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)],
      ],
      address: [userData?.address || '', Validators.required],
      paymentMethod: [userData?.paymentMethod || 'online', Validators.required],
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Form submitted:', this.checkoutForm.value);
      // TODO send order data to backend (recipientName, phoneNumber, address, paymentMethod)

      if (this.checkoutForm.value.paymentMethod === 'cash') {
        this.router.navigate(['/success']);
      } else {
        let itemList = this.cartService.getStripeItemList();

        if (itemList.length === 0) {
          alert('Your cart is empty!');
          return;
        }

        this.paymentService.createPayment(itemList).subscribe((res: any) => {
          window.location.href = res.url;
        });
      }
    }
  }
}
