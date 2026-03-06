import { Component, EventEmitter, Output } from '@angular/core';
import { DataGetter } from '../../models/data-getter';
import { JsonDataGetter } from '../../models/json-data-getter';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  imports: [FormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class Filters {
  private dataGetter: DataGetter;
  categories: string[];
  chosenCategory: string;
  searchText: string;
  minPrice: any;
  maxPrice: any;

  @Output() categoryEvent = new EventEmitter<string>();
  @Output() textEvent = new EventEmitter<string>();
  @Output() minPriceEvent = new EventEmitter<number>();
  @Output() maxPriceEvent = new EventEmitter<number>();

  constructor() {
    this.dataGetter = new JsonDataGetter();
    this.categories = [...new Set(this.dataGetter.getData().map((p) => p.category))];

    this.chosenCategory = 'all';
    this.searchText = '';
    this.minPrice = null;
    this.maxPrice = null;
  }

  informParent() {
    let tempMax = this.maxPrice,
      tempMin = this.minPrice;

    if (tempMax == null) tempMax = Number.MAX_VALUE;
    if (tempMin == null) tempMin = 0;
    if (tempMin >= 0 && tempMax >= 0) {
      this.categoryEvent.emit(this.chosenCategory);
      this.textEvent.emit(this.searchText);
      this.minPriceEvent.emit(tempMin);
      this.maxPriceEvent.emit(tempMax);
    }
  }
}
