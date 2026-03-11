import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducts } from '../../models/iproducts';
import { CurrencyPipe } from '@angular/common';
import { CardImgDirective } from '../../directives/card-img-directive';
import { ProductCardDirective } from '../../directives/product-card-directive';
import { ProductDescSplitterPipe } from '../../pipes/product-desc-splitter-pipe';
import { Mybtn } from '../mybtn/mybtn';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-product-card',
  imports: [
    FormsModule,
    ProductCardDirective,
    CardImgDirective,
    ProductDescSplitterPipe,
    CurrencyPipe,
    Mybtn,
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product = {} as IProducts;
  @Output() curPrice = new EventEmitter<number>();
  quantityErrMsg = '';

  fullDesc: boolean = false;

  constructor(private cartService: CartService, public auth: AuthService) {}

  flipDesc(): void {
    this.fullDesc = !this.fullDesc;
  }

  validQuantity(quantity: number, stock: number): boolean {
    if (this.positiveQuantity(quantity) && this.checkStock(quantity, stock)) {
      this.quantityErrMsg = '';
      return true;
    }
    return false;
  }

  positiveQuantity(quantity: number): boolean {
    if (quantity < 0) {
      this.quantityErrMsg = 'Invalid quantity';
      return false;
    }
    return true;
  }

  checkStock(quantity: number, stock: number): boolean {
    if (quantity > stock) {
      this.quantityErrMsg = 'Quantity is not available';
      return false;
    }
    return true;
  }

  buy(inp: any, p: IProducts) {
    if (this.validQuantity(inp.value, p.stock)) {
      let price = Number(inp.value) * p.price;
      p.stock -= Number(inp.value);
      this.curPrice.emit(price);
      this.cartService.addProduct(p, Number(inp.value));
      inp.value = '';
    }
  }

  getUserRole(){
    return this.auth.user()?.role;
  }
}
