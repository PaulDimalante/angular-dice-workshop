import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const MAX_DICE = 6;

@Injectable({
  providedIn: 'root'
})
export class RollService {

  constructor() { }

  roll(): Observable<number> {
    return of(Math.floor(Math.random()*MAX_DICE)+1);
  }
}
