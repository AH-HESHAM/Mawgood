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

  @Input() chosenCategoryFilter: string = 'all';
  @Input() searchByText: string = '';
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = Number.MAX_VALUE;

  @Output() total = new EventEmitter<number>();

  constructor(private dataService: StaticData) {}

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
}
