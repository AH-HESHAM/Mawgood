import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducts } from '../../models/iproducts';
import { DataGetter } from '../../models/data-getter';
import { JsonDataGetter } from '../../models/json-data-getter';
import { ProductCardDirective } from '../../directives/product-card-directive';
import { CardImgDirective } from '../../directives/card-img-directive';
import { ProductDescSplitterPipe } from '../../pipes/product-desc-splitter-pipe';
import { CurrencyPipe } from '@angular/common';
import { Mybtn } from '../mybtn/mybtn';
import { FormsModule } from '@angular/forms';
import { StaticData } from '../../services/static-data';

@Component({
  selector: 'app-products',
  imports: [
    ProductCardDirective,
    CardImgDirective,
    ProductDescSplitterPipe,
    CurrencyPipe,
    Mybtn,
    FormsModule,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  filteredProductsList: IProducts[] = [];
  fullDesc: boolean[] = [];
  totalPrice: number = 0;

  @Input() chosenCategoryFilter: string = 'all';
  @Input() searchByText: string = '';
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = Number.MAX_VALUE;

  @Output() total = new EventEmitter<number>();

  constructor(private dataService: StaticData) {}

  flipDesc(id: number): void {
    this.fullDesc[id] = !this.fullDesc[id];
  }

  buy(inp: any, p: IProducts) {
    if (inp.value > p.stock || inp.value < 1) {
      alert('enter valid count');
      inp.value = '';
      return;
    }
    this.totalPrice += inp.value * p.price;
    this.total.emit(this.totalPrice);
    p.stock -= inp.value;
  }

  ngOnInit(): void {
    this.initializeData();
    this.closeAllDesc();
  }

  private initializeData(): void {
    this.filteredProductsList = this.dataService.getAllProducts();
  }
  private closeAllDesc(): void {
    this.fullDesc = Array(this.filteredProductsList.length).fill(false);
  }
  ngOnChanges(): void {
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProductsList = this.dataService.filterProducts(
      this.chosenCategoryFilter,
      this.searchByText,
      this.minPrice,
      this.maxPrice,
    );
  }
}
