import { Component, Input } from '@angular/core';
import { IProducts } from '../../models/iproducts';
import { CurrencyPipe } from '@angular/common';
import { CardImgDirective } from '../../directives/card-img-directive';
import { ProductCardDirective } from '../../directives/product-card-directive';
import { ProductDescSplitterPipe } from '../../pipes/product-desc-splitter-pipe';
import { Mybtn } from '../mybtn/mybtn';

@Component({
  selector: 'app-product-card',
  imports: [ProductCardDirective, CardImgDirective, ProductDescSplitterPipe, CurrencyPipe, Mybtn],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product = {} as IProducts;

  fullDesc:boolean = false;

  flipDesc(): void {
    this.fullDesc = !this.fullDesc;
  }
  

  // buy(inp: any, p: IProducts) {
  //   if (inp.value > p.stock || inp.value < 1) {
  //     alert('enter valid count');
  //     inp.value = '';
  //     return;
  //   }
  //   this.totalPrice += inp.value * p.price;
  //   this.total.emit(this.totalPrice);
  //   p.stock -= inp.value;
  // }
}
