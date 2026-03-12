import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicData } from '../../services/dynamic-data';
import { map } from 'rxjs';

@Component({
  selector: 'app-filters',
  imports: [FormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class Filters {
  categories: string[] = [];
  chosenCategory: string;
  searchText: string;
  minPrice: any;
  maxPrice: any;
  priceErrMsg: string = '';

  @Output() categoryEvent = new EventEmitter<string>();
  @Output() textEvent = new EventEmitter<string>();
  @Output() minPriceEvent = new EventEmitter<number>();
  @Output() maxPriceEvent = new EventEmitter<number>();

  constructor(private dataGetter: DynamicData) {
    this.chosenCategory = 'all';
    this.searchText = '';
    this.minPrice = null;
    this.maxPrice = null;
  }

  ngOnInit() {
    this.dataGetter
      .filterProducts()
      .pipe(
        map((products) => {
          return [...new Set(products.map((p) => p.category))];
        }),
      )
      .subscribe((cats) => {
        this.categories = cats;
      });
  }

  informParent() {
    let tempMax = this.maxPrice,
      tempMin = this.minPrice;

    if (tempMax == null) tempMax = Number.MAX_VALUE;
    if (tempMin == null) tempMin = 0;
    if (tempMin >= 0 && tempMax >= 0 && tempMax >= tempMin) {
      this.priceErrMsg = '';
      this.categoryEvent.emit(this.chosenCategory);
      this.textEvent.emit(this.searchText);
      this.minPriceEvent.emit(tempMin);
      this.maxPriceEvent.emit(tempMax);
    } else {
      this.priceErrMsg = 'Invalid price limit';
    }
  }
}
