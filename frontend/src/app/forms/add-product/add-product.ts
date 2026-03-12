import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IProducts } from '../../models/iproducts';
import { DynamicData } from '../../services/dynamic-data';
import { Mybtn } from '../../components/mybtn/mybtn';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, CommonModule, Mybtn],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  product: IProducts = {} as IProducts;
  constructor(
    private dataService: DynamicData,
    private router: Router,
    private auth: AuthService,
  ) {}

  cancel() {}

  submit() {
    let mail = this.auth.user()?.email ? this.auth.user()?.email : '';
    if (mail) this.product.vendorMail = mail;
    this.dataService.post(this.product).subscribe();
    this.router.navigateByUrl('/products');
  }
}
