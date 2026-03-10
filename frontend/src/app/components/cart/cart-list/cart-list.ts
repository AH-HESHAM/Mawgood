import { Component, Signal } from '@angular/core';
import { CartService } from '../../../services/cart-service';
import { ICartItem } from '../../../models/icart-item';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart-list',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css',
})
export class CartList {
  cartProducts: Signal<ICartItem[]>;
  constructor(private cartService: CartService) {
    this.cartProducts = this.cartService.cart;
  }
  increamentQuantity(id: number) {
    const product = this.cartProducts().find((item) => item.id === id);
    this.cartService.updateQuantity(id, product!.quantity + 1);
  }
  decreamentQuantity(id: number) {
    const product = this.cartProducts().find((item) => item.id === id);
    this.cartService.updateQuantity(id, product!.quantity - 1);
  }
  removeProduct(id: number) {
    this.cartService.removeProduct(id);
  }
}
