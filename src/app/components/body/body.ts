import { Component } from '@angular/core';
import { Products } from '../products/products';
import { FormsModule } from '@angular/forms';
import { DataGetter } from '../../models/data-getter';
import { JsonDataGetter } from '../../models/json-data-getter';

@Component({
  selector: 'app-body',
  imports: [Products, FormsModule],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  private dataGetter: DataGetter;
  categories: string[];
  chosenCategory: string;
  searchText: string;
  minPrice: any;
  maxPrice: any;
  TotalPrice: number;
  constructor() {
    this.dataGetter = new JsonDataGetter();
    this.categories = [...new Set(this.dataGetter.getData().map((p) => p.category))];

    this.chosenCategory = 'all';
    this.searchText = '';
    this.minPrice = null;
    this.maxPrice = null;

    this.TotalPrice = 0;
  }
  receivedPrice(price: number) {
    this.TotalPrice = price;
  }
}
