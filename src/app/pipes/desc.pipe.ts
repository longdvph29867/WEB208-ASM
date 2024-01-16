import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desc',
  standalone: true
})
export class DescPipe implements PipeTransform {

  transform(value: string, args: number): string {
    return value.slice(0, args) + "...";
  }

}
