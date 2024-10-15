import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class ArraySortPipe implements PipeTransform {
  transform(array: any[] | undefined, field: string): any[] | null {
    if (!Array.isArray(array)) {
      return null;
    }
    array.sort((a: any, b: any) => {
      if (a[field] === undefined && b[field] === undefined) {
        return 0;
      } else if (a[field] === undefined && b[field] !== undefined) {
        return 1;
      } else if (a[field] !== undefined && b[field] === undefined) {
        return -1;
      } else if (a[field] < b[field]) {
        return 1;
      } else if (a[field] > b[field]) {
        return -1;
      } else {
        return 0;
      }
    });

    return array;
  }
}
