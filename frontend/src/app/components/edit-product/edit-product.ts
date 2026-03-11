// edit-product.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IProducts } from '../../models/iproducts';
import { Mybtn } from '../mybtn/mybtn';
import { CommonModule } from '@angular/common';
import { DynamicData } from '../../services/dynamic-data';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule, CommonModule, Mybtn],
  templateUrl: './edit-product.html',
  styleUrl:'./edit-product.css'
})
export class EditProduct implements OnInit {
  product: IProducts;

  constructor(private router: Router, private dataService:DynamicData) {
    // retrieve state passed from navigate
    const nav = this.router.getCurrentNavigation();
    this.product = nav?.extras?.state?.['product'];
  }

  ngOnInit() {
    if (!this.product) {
      // fallback if user lands directly on URL without state
      this.router.navigate(['/']);
    }
  }

  submit() {
    this.dataService.update(this.product).subscribe()
    this.router.navigate(['/products']);
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}