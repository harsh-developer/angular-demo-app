import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roundNumber'
})
export class RoundNumberPipe implements PipeTransform {
    transform(value: number): string {
        if (isNaN(value)) {
            return 'NaN';
        }

        // Check if the value is less than a lakh
        if (value < 100000) {
            return value.toString();
        }
        if (value < 99999) {

        }

        // Convert to lakhs
        const lakhs = value / 100000;
        return lakhs.toFixed(1);
    }
}
