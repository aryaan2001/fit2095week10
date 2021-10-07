import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string, ...args: number[]): unknown {
    console.log("TReached here " ,value, args[0])
    let age =  new Date().getFullYear() - args[0]

    // let transformedStr = '';
    // let startingIndex = args[0];
    // let stopIndex = args[1];
    // transformedStr = value.substring(startingIndex, stopIndex);
    return age;
  }

}
