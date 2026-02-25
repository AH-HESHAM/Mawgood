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
  dataExtractor: DataGetter;
  productsList: IProducts[];

  fullDesc: boolean[];
  totalPrice: number;

  @Input() chosenCategoryFilter: string;
  @Input() searchByText: string;
  @Input() minPrice: number;
  @Input() maxPrice: number;
  filteredProductsList: IProducts[];

  @Output() total = new EventEmitter<number>();

  constructor() {
    this.dataExtractor = new JsonDataGetter();
    this.productsList = this.dataExtractor.getData();

    this.fullDesc = Array(this.productsList.length).fill(false);

    this.totalPrice = 0;

    this.filteredProductsList = [];
    this.chosenCategoryFilter = 'all';
    this.searchByText = '';
    this.minPrice = 0;
    this.maxPrice = Number.MAX_VALUE;
  }

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
    if (this.chosenCategoryFilter === 'all') {
      this.filteredProductsList = this.productsList;
    }
  }
  ngOnChanges(): void {
    this.filterProducts();
  }

  filterProducts() {
    this.filterByCategory();
    this.filterByText();
    this.filterByPrice();
  }

  private filterByCategory() {
    if (this.chosenCategoryFilter === 'all') this.filteredProductsList = this.productsList;
    else
      this.filteredProductsList = this.productsList.filter(
        (product) => product.category === this.chosenCategoryFilter,
      );
  }

  private filterByText() {
    if (this.searchByText.trim() !== '') {
      this.filteredProductsList = this.filteredProductsList.filter((product) => {
        return (
          product.title.includes(this.searchByText) ||
          product.description.includes(this.searchByText)
        );
      });
    }
  }

  private filterByPrice() {
    if (this.minPrice < 0 || this.maxPrice < 0) alert('Enter positive price');
    else {
      if(this.maxPrice ==null)
        this.maxPrice = Number.MAX_VALUE;
      if(this.minPrice == null)
        this.minPrice = 0
      this.filteredProductsList = this.filteredProductsList.filter((product) => {
        return product.price >= +this.minPrice && product.price <= +this.maxPrice;
      });
    }
  }
}
