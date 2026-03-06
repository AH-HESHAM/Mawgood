import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StaticData } from '../../services/static-data';
import { Router } from '@angular/router';
import { DynamicData } from '../../services/dynamic-data';

@Component({
  selector: 'app-delete-product',
  imports: [FormsModule],
  templateUrl: './delete-product.html',
  styleUrl: './delete-product.css',
})
export class DeleteProduct {
  id: number | undefined;
  constructor(
    // private dataService: StaticData,
    private dataService: DynamicData,
    private router: Router,
  ) {}

  delete() {
    this.dataService.delete(this.id?this.id:0).subscribe();
    this.router.navigateByUrl('/products');
  }
}
