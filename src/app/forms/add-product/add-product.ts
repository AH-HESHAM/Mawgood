import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StaticData } from '../../services/static-data';
import { Router } from '@angular/router';
import { IProducts } from '../../models/iproducts';
import { DynamicData } from '../../services/dynamic-data';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  newPrd: IProducts = {} as IProducts;
  constructor(
    // private dataService: StaticData,
    private dataService: DynamicData,
    private router: Router,
  ) {}

  add() {
    this.newPrd.price = 1;
    this.dataService.post(this.newPrd).subscribe();
    this.router.navigateByUrl('/products');
  }
}
