import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
    name : 'test'
})
export class BooleanPipe implements PipeTransform {
    transform(base: boolean) {
        return  base == true ? 'Yes' : 'No';
    }
}