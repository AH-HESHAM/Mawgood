import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Payment } from '../../services/payment';

@Component({
  selector: 'app-payment-success',
  imports: [RouterLink],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css',
})
export class PaymentSuccess implements OnInit {
  constructor(private payment: Payment) {}
  ngOnInit(): void {
    // simulate success payment in strip and affects backend
    this.payment.createCashPayment([]).subscribe((res: any) => {
      console.log(res);
    });
  }
}
