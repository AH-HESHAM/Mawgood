import { Injectable } from '@angular/core';
import { ICoupon } from '../models/icoupon';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

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
    let coupon: ICoupon | undefined;
    this.httpService
      .get(`http://localhost:3000/promocodes/validate?code=${code}`)
      .pipe(map((res: any) => res.promocode))
      .subscribe((res) => {
        coupon = res;
      });
    return coupon;
  }
  applyCoupon(code: string, userID: string) {
    return this.httpService
      .post(`http://localhost:3000/promocodes/apply`, {
        code,
        userId: userID,
      })
      .subscribe();
  }
}
