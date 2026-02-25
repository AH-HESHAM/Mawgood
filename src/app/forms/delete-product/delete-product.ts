import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StaticData } from '../../services/static-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  imports: [FormsModule],
  templateUrl: './delete-product.html',
  styleUrl: './delete-product.css',
})
export class DeleteProduct {
  id: number | undefined;
  constructor(
    private staticData: StaticData,
    private router: Router,
  ) {}

  delete() {
    this.staticData.delete(this.id?this.id:0);
    this.router.navigateByUrl('/products');
  }
}
