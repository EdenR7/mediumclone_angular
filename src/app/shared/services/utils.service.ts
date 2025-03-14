import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  range(start: number, end: number): number[] {
    const range = [];
    for (let index = start; index <= end; index++) {
      range.push(index);
    }
    return range;
  }
}
