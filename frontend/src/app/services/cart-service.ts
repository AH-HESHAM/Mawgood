import { Injectable, signal } from '@angular/core';
import { ICartItem } from '../models/icart-item';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth-service';
import { IProducts } from '../models/iproducts';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<ICartItem[]>([]);
  private readonly baseURL = 'http://localhost:3000';
  constructor(
    private httpclient: HttpClient,
    private authservice: AuthService,
  ) {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      this.cart.set(JSON.parse(localCart));
    } else if (authservice.isLoggedIn()) {
      httpclient
        .get<{ items: ICartItem[] }>(`${this.baseURL}/cart/${this.authservice.getUserId()}`)
        .subscribe((res) => {
          this.cart.set(res.items);
        });
    }
  }
  updateQuantity(id: number, quantity: number) {
    let currCart = [...this.cart()];
    let selectedItem = currCart.findIndex((item: ICartItem) => item.id === id);
    if (selectedItem !== -1) {
      if (quantity == 0) {
        currCart.splice(selectedItem, 1);
      } else {
        currCart[selectedItem].quantity = quantity;
      }
    }
    this.cart.set(currCart);
    localStorage.setItem('cart', JSON.stringify(this.cart()));
    if (this.authservice.isLoggedIn()) {
      const userID = this.authservice.getUserId();
      this.httpclient.put(`${this.baseURL}/cart/${userID}`, {
        itemId: id,
        quantity: quantity,
      });
    }
    return;
  }
  removeProduct(id: number) {
    let currCart = [...this.cart()];
    let selectedItem = currCart.findIndex((item: ICartItem) => item.id === id);
    if (selectedItem !== -1) {
      currCart.splice(selectedItem, 1);
    }
    this.cart.set(currCart);
    localStorage.setItem('cart', JSON.stringify(this.cart()));
    if (this.authservice.isLoggedIn()) {
      const userID = this.authservice.getUserId();
      this.httpclient.delete(`${this.baseURL}/cart/${userID}/${id}`);
    }
    return;
  }

  addProduct(product: IProducts, quantity: number) {
    let currCart = [...this.cart()];
    let selectedItem = currCart.findIndex((item: ICartItem) => item.id === product.id);
    if (selectedItem !== -1) {
      currCart[selectedItem].quantity += quantity;
    } else {
      const newProduct: ICartItem = { ...product, quantity: quantity } as ICartItem;
      console.log(newProduct);
      currCart.push(newProduct);
    }
    this.cart.set(currCart);
    localStorage.setItem('cart', JSON.stringify(this.cart()));
    if (this.authservice.isLoggedIn()) {
      const userID = this.authservice.getUserId();
      const newProduct: ICartItem = { ...product, quantity: quantity } as ICartItem;
      this.httpclient.post(`${this.baseURL}/cart/${userID}`, newProduct);
    }
    return;
  }
}
