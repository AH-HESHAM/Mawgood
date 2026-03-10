import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { UserCheckoutPage } from '../user-checkout-page/user-checkout-page';
import { GuestCheckoutPage } from '../guest-checkout-page/guest-checkout-page';

@Component({
  selector: 'app-checkout-dispatcher',
  imports: [UserCheckoutPage, GuestCheckoutPage],
  templateUrl: './checkout-dispatcher.html',
  styleUrl: './checkout-dispatcher.css',
})
export class CheckoutDispatcher {
  constructor(private authService: AuthService) {}
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
