import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productDescSplitter',
  standalone:true,
})
export class ProductDescSplitterPipe implements PipeTransform {

  transform(value: string): string {
    return value.split(" ", 3).join(" ");
  }

}
