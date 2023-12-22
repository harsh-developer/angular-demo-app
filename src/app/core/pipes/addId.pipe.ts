import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'addId'
})


export class AddJobId implements PipeTransform {
    transform(input: any): string {
        return "JOB" + input;
    }
}
