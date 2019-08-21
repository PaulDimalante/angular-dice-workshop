import { Component, OnInit } from '@angular/core';
import { RollService } from 'src/app/roll.service';

function aggregate(arr) {
  return arr.reduce((total,num) => total+num, 0);
}

@Component({
  selector: 'app-dice-game',
  templateUrl: './dice-game.component.html',
  styleUrls: ['./dice-game.component.css']
})
export class DiceGameComponent implements OnInit {
  gameStarted: boolean = false;
  playerDiceList: number[] = [];
  opponentDiceList: number[] = [];

  constructor(private service: RollService) { }

  ngOnInit() {
  }

  isGameStarted(): boolean {
    return this.gameStarted;
  }

  startGame(): void {
    this.gameStarted = true;
    this.opponentRoll();
  }

  playerRoll(): void {
    this.service.roll().subscribe(num => {
      this.playerDiceList.push(num);
    });
  }

  opponentRoll(): void {
    this.service.roll().subscribe(num => {
      this.opponentDiceList.push(num);
    });
  }

  isGameLost(): boolean {
    if (!this.playerDiceList.length) {return false};
    const playerSum = aggregate(this.playerDiceList);
    const opponentSum = aggregate(this.opponentDiceList);
    if (this.opponentDiceList.length === 2 && playerSum <= opponentSum) {return true;}
    return playerSum>12;
  }

  quit(): void {
    window.close();
  }
}
