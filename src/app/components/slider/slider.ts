import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider {
  constructor(private cdr: ChangeDetectorRef) {}

  images: string[] = [
    'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp',
    'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp',
    'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp',
    'https://cdn.dummyjson.com/product-images/groceries/apple/1.webp',
  ];

  curIndx: number = 0;

  moveForward() {
    this.curIndx = (this.curIndx + 1) % this.images.length;
  }

  moveBackward() {
    if (this.curIndx === 0) this.curIndx = this.images.length - 1;
    else this.curIndx--;
  }

  ngOnInit() {
    setInterval(() => {
      this.moveForward();
      this.cdr.detectChanges();
    }, 5000);
  }
}
