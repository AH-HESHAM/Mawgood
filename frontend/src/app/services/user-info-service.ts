import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  userData = {
    recipientName: 'John Doe',
    phoneNumber: '0123456789',
    address: '123 Main St, Springfield',
    paymentMethod: 'cash',
  };

  getUserInfo() {
    return this.userData;
  }
}
