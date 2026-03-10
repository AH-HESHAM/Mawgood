import { Injectable } from '@angular/core';
import { ICoupon } from '../models/icoupon';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  coupons: ICoupon[] = [
    {
      code: 'SAVE10',
      discount: 10,
    },
    {
      code: 'SAVE20',
      discount: 20,
    },
  ];
  constructor(private httpService: HttpClient) {}

  validateCoupon(code: string): ICoupon | undefined {
    const coupon = this.coupons.find((coupon) => coupon.code === code);
    if (!coupon) {
      return undefined;
    }
    return coupon;
  }
}
