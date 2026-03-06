import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducts } from '../../models/iproducts';
import { CurrencyPipe } from '@angular/common';
import { CardImgDirective } from '../../directives/card-img-directive';
import { ProductCardDirective } from '../../directives/product-card-directive';
import { ProductDescSplitterPipe } from '../../pipes/product-desc-splitter-pipe';
import { Mybtn } from '../mybtn/mybtn';
import { FormsModule } from '@angular/forms';

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
  err = '';

  fullDesc: boolean = false;

  flipDesc(): void {
    this.fullDesc = !this.fullDesc;
  }

  validQuantity(quantity: number, stock: number): boolean {
    if (this.positiveQuantity(quantity) && this.checkStock(quantity, stock)) {
      this.err = '';
      return true;
    }
    return false;
  }

  positiveQuantity(quantity: number): boolean {
    if (quantity < 0) {
      this.err = 'Invalid quantity';
      return false;
    }
    return true;
  }

  checkStock(quantity: number, stock: number): boolean {
    if (quantity > stock) {
      this.err = 'Quantity is not available';
      return false;
    }
    return true;
  }

  buy(inp: any, p: IProducts) {
    if (this.validQuantity(inp.value, p.stock)) {
      let price = inp.value * p.price;
      p.stock -= inp.value;
      this.curPrice.emit(price);
      inp.value = '';
    }
  }
}
