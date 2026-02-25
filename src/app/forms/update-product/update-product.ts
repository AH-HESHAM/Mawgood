import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StaticData } from '../../services/static-data';
import { Router } from '@angular/router';
import { IProducts } from '../../models/iproducts';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct {
  newPrd: IProducts = {} as IProducts;
  constructor(
    private staticData: StaticData,
    private router: Router,
  ) {}

  update() {
    this.staticData.update( this.newPrd);
    this.router.navigateByUrl('/products');
  }
}
