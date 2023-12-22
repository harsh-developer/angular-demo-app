import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToK'
})


export class ConvertToKPipe implements PipeTransform {
    transform(value: any): any {
        if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'K';
        } else {
            return value?.toString();
        }
    }
}
