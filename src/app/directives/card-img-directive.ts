import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardImgDirective]',
})
export class CardImgDirective {

  constructor(private elementRef: ElementRef) { 
    this.elementRef.nativeElement.style.transform='scale(1)'
  }

  @HostListener('mouseover') mouseover(){
    this.elementRef.nativeElement.style.transform='scale(2)'
  } 

  @HostListener('mouseout') mouseout(){
    this.elementRef.nativeElement.style.transform='scale(1)'
  } 

}
