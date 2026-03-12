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
  ) {}
  loadCartItems() {
    if (this.authservice.isLoggedIn()) {
      this.httpclient
        .get<ICartItem[]>(`${this.baseURL}/cart/${this.authservice.getUserId()}`, {
          withCredentials: true,
        })
        .subscribe((res) => {
          this.cart.set(res);
          localStorage.setItem('cart', JSON.stringify(this.cart()));
        });
    } else {
      this.loadLocalCart();
    }
  }

  private loadLocalCart() {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      this.cart.set(JSON.parse(localCart));
    }
  }
  updateQuantity(id: number, quantity: number) {
    let currCart = [...this.cart()];
    let selectedItem = currCart.findIndex((item: ICartItem) => item._id === id);
    if (selectedItem !== -1) {
      if (quantity == 0) {
        currCart.splice(selectedItem, 1);
      } else {
        currCart[selectedItem].quantity = quantity;
      }
    }
    this.cart.set(currCart);
    if (this.cart().length > 0) {
      localStorage.setItem('cart', JSON.stringify(this.cart()));
    } else {
      localStorage.removeItem('cart');
    }
    if (this.authservice.isLoggedIn()) {
      const userID = this.authservice.getUserId();
      this.httpclient
        .put(
          `${this.baseURL}/cart/${userID}`,
          {
            itemId: id,
            quantity: quantity,
          },
          { withCredentials: true },
        )
        .subscribe();
    }
    return;
  }
  removeProduct(id: number) {
    let currCart = [...this.cart()];
    let selectedItem = currCart.findIndex((item: ICartItem) => item._id === id);
    if (selectedItem !== -1) {
      currCart.splice(selectedItem, 1);
    }
    this.cart.set(currCart);
    if (this.cart().length > 0) {
      localStorage.setItem('cart', JSON.stringify(this.cart()));
    } else {
      localStorage.removeItem('cart');
    }
    localStorage.setItem('cart', JSON.stringify(this.cart()));
    if (this.authservice.isLoggedIn()) {
      const userID = this.authservice.getUserId();
      this.httpclient
        .delete(`${this.baseURL}/cart/${userID}`, { body: { _id: id }, withCredentials: true })
        .subscribe();
    }
    return;
  }

  addProduct(product: IProducts, quantity: number) {
    let currCart = [...this.cart()];
    let selectedItem = currCart.findIndex((item: ICartItem) => item._id === product._id);
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
      this.httpclient
        .post(`${this.baseURL}/cart/${userID}`, newProduct, { withCredentials: true })
        .subscribe();
    }
    return;
  }
  getStripeItemList = () => {
    return this.cart().map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });
  };
}
