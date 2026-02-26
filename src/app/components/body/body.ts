import { Component } from '@angular/core';
import { Products } from '../products/products';
import { Filters } from '../filters/filters';

@Component({
  selector: 'app-body',
  imports: [Products, Filters],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  chosenCategory: string;
  searchText: string;
  minPrice: number;
  maxPrice: number;
  TotalPrice: number;
  constructor() {
    this.chosenCategory = 'all';
    this.searchText = '';
    this.minPrice = 0;
    this.maxPrice = Number.MAX_VALUE;
    this.TotalPrice = 0;
  }
  receivedPrice(price: number) {
    this.TotalPrice = price;
  }
  receiveCategory(category: string) {
    this.chosenCategory = category;
  }

  receiveSearchText(text: string) {
    this.searchText = text;
  }
  receiveMinPrice(minPrice: number) {
    this.minPrice = minPrice;
  }

  receiveMaxPrice(maxPrice: number) {
    this.maxPrice = maxPrice;
  }
}
