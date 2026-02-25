import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StaticData } from '../../services/static-data';
import { Router } from '@angular/router';
import { IProducts } from '../../models/iproducts';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  newPrd: IProducts = {} as IProducts;
  constructor(
    private staticData: StaticData,
    private router: Router,
  ) {}

  add() {
    this.staticData.post(this.newPrd);
    this.router.navigateByUrl('/products');
  }
}
