import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Payment {
  api = "http://localhost:3000/payment";

  constructor(private http: HttpClient) {}

  createPayment(itemList: any[]) {
    return this.http.post<any>(`${this.api}/create-checkout-session`,{
      line_items: itemList
    },{withCredentials: true});
  }
}
