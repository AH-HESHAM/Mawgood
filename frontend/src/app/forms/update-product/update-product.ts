import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StaticData } from '../../services/static-data';
import { Router } from '@angular/router';
import { IProducts } from '../../models/iproducts';
import { DynamicData } from '../../services/dynamic-data';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct {
  newPrd: IProducts = {} as IProducts;
  constructor(
    // private dataService: StaticData,
    private dataService: DynamicData,
    private router: Router,
  ) {}

  update() {
    this.dataService.update( this.newPrd).subscribe();
    this.router.navigateByUrl('/products');
  }
}
