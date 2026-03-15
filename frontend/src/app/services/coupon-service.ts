import { Injectable } from '@angular/core';
import { ICoupon } from '../models/icoupon';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  // coupons: ICoupon[] = [
  //   {
  //     code: 'SAVE10',
  //     discount: 10,
  //   },
  //   {
  //     code: 'SAVE20',
  //     discount: 20,
  //   },
  // ];
  constructor(private httpService: HttpClient) {}

  validateCoupon(code: string): Observable<ICoupon | undefined> {
    return this.httpService
      .get(`http://localhost:3000/promocodes/validate?code=${code}`, { withCredentials: true })
      .pipe(map((res: any) => res.promocode));
  }
  applyCoupon(code: string, userID: string) {
    return this.httpService
      .post(
        `http://localhost:3000/promocodes/apply`,
        {
          code,
          userId: userID,
        },
        { withCredentials: true },
      )
      .subscribe();
  }
}
