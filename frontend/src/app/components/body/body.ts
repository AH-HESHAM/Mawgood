import { Component } from '@angular/core';
import { Products } from '../products/products';
import { Filters } from '../filters/filters';
import { AuthService } from '../../services/auth-service';
import { Mybtn } from '../mybtn/mybtn';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  imports: [Products, Filters, Mybtn],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  chosenCategory: string;
  searchText: string;
  minPrice: number;
  maxPrice: number;
  TotalPrice: number;
  constructor(private auth : AuthService, private router : Router) {
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

  getUserRole(){
    return this.auth.user()?.role;
  }

  add(){
    this.router.navigate(['/add-product']);
  }
}
