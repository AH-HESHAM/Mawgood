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
  imports: [FormsModule, ProductCardDirective, CardImgDirective, ProductDescSplitterPipe, CurrencyPipe, Mybtn],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product = {} as IProducts;
  @Output() curPrice = new EventEmitter<number>();

  fullDesc:boolean = false;

  flipDesc(): void {
    this.fullDesc = !this.fullDesc;
  }
  
  buy(inp: any, p: IProducts) {
    if (inp.value > p.stock || inp.value < 1) {
      alert('enter valid count');
      inp.value = '';
      return;
    }
    let price = inp.value * p.price;
    p.stock -= inp.value;
    this.curPrice.emit(price);
  }
}
