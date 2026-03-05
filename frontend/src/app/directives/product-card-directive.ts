import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appProductCardDirective]',
})
export class ProductCardDirective {

  constructor(private elementRef: ElementRef) { 
    this.elementRef.nativeElement.style.boxShadow = ' 10px 10px 5px lightblue';
  }

}
