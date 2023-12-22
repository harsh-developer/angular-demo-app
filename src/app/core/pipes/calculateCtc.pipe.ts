import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertCtc'
})
export class NumberAbbreviationPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1e12) {
      return (value / 1e12).toFixed(1) + ' Trillions';
    } else if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + ' Billions';
    } else if (value >= 10000000) {
      return (value / 10000000).toFixed(1) + ' Crores';
    } else if (value >= 100000) {
      return (value / 100000).toFixed(1) + ' Lakhs';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + ' K';
    } else {
      return value.toString();
    }
  }
}
