import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(timeInSeconds: number): string {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    return this.str_pad_left(minutes.toString(),'0',1) +
      ':' + this.str_pad_left(seconds.toString(),'0',2);
  }

  str_pad_left(string: string, pad: string, length: number) {
    return (new Array(length+1).join(pad) + string).slice(-length);
  }
}
