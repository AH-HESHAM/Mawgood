import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducts } from '../../models/iproducts';
import { FormsModule } from '@angular/forms';
import { StaticData } from '../../services/static-data';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [FormsModule, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  filteredProductsList: IProducts[] = [];
  fullDesc: boolean[] = [];

  totalPrice: number = 0;

  @Input() curPrice: number = 0;
  @Input() chosenCategoryFilter: string = 'all';
  @Input() searchByText: string = '';
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = Number.MAX_VALUE;

  @Output() total = new EventEmitter<number>();

  constructor(private dataService: StaticData) {}

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    this.filteredProductsList = this.dataService.getAllProducts();
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

  receiveCurPrice(price: number) {
    this.curPrice = price;
    console.log(this.curPrice)
    this.totalPrice += this.curPrice;
    this.total.emit(this.totalPrice);
  }
}
