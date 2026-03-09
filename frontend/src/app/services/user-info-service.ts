import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  userData = {
    recipientName: 'John Doe',
    address: '123 Main St, Springfield',
    paymentMethod: 'Credit Card',
  };

  getUserInfo() {
    return this.userData;
  }
}
