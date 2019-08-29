import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const MAX_DICE = 6;
@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() { }

  roll(): Observable<number> {
    return of(Math.ceil(Math.random() * MAX_DICE));
  }

  addDice(response: number, attackType: string): string {
    let imgType = "";
    if (attackType === "Attack" && [1, 2, 3].includes(response)){
      imgType = "Attack";
    } else if (attackType === "Counter" && (response === 1 || response === 2)){
      imgType = "Counter";
    } else if (attackType === "Counter" && response === 3){
      imgType = "Shield"
    } else if (attackType === "Defend" && (response === 1 || response === 2 || response === 3 || response === 4)) {
      imgType = "Shield";
    } else if (attackType === "Flee" && (response === 1 || response === 2)) {
      imgType = "Flee";
    } else {
      imgType = "Nothing";
    }
    return imgType;
  };
}
