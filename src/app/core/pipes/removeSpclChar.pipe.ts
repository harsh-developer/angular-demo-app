import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeSpecialCharacters'
})
export class RemoveSpecialCharactersPipe implements PipeTransform {
    transform(input: string): string {
        if (input) {
            const str = input.replace(/\s/g, '-').replace(/[&\/\|\\#,+()$~%.'":*?<>{}]/g, '-');
            return str;
        } else {
            return input;
        }
    }
}
