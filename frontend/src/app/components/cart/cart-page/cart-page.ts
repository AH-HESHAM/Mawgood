import { Component, Signal } from '@angular/core';
import { CartList } from '../cart-list/cart-list';
import { ICoupon } from '../../../models/icoupon';
import { CartService } from '../../../services/cart-service';
import { AuthService } from '../../../services/auth-service';
import { ICartItem } from '../../../models/icart-item';
import { DecimalPipe } from '@angular/common';
import { CouponService } from '../../../services/coupon-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CartList, DecimalPipe],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  cartProducts: Signal<ICartItem[]>;
  shippingCost = 20;
  coupons: ICoupon[] = [];
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private couponService: CouponService,
    private router: Router,
  ) {
    this.cartProducts = this.cartService.cart;
  }
  addCoupon(code: string) {
    if (this.coupons.some((c) => c.code === code)) {
      alert('Coupon already applied');
      return;
    }
    const coupon = this.couponService.validateCoupon(code);
    if (coupon) {
      this.coupons.push(coupon);
    } else {
      alert('Invalid coupon code');
    }
  }
  removeCoupon(code: string) {
    this.coupons = this.coupons.filter((coupon) => coupon.code !== code);
  }
  getSubtotal() {
    return this.cartProducts().reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private getTotalDiscount() {
    return this.coupons.reduce(
      (total, coupon) => total + (this.getSubtotal() * coupon.discount) / 100,
      0,
    );
  }

  getTotalPrice() {
    return this.getSubtotal() + this.shippingCost - this.getTotalDiscount();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
