import { Component, OnInit } from '@angular/core';
import { DiceService } from 'src/app/services/dice.service';
import { Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EndingDialogComponent } from './game-over/ending-dialog/ending-dialog.component';

@Component({
  selector: 'app-dungion-crawler',
  templateUrl: './dungion-crawler.component.html',
  styleUrls: ['./dungion-crawler.component.css']
})
export class DungionCrawlerComponent implements OnInit {

  dmgDealt : number;
  dmgBlocked : number;
  dmgTaken : number;
  currentImage: string = "";
  playerDiceRolls : string[] = [];
  enemyDiceRolls : string[] = [];
  mobCounter: number;
  playersCurrentAttackType : string;
  enemyCurrentAttackType: string;
  enemyAttackTypeOnHtml: string;
  currClass: string;
  enemyHealth: number;
  playerHealth: number;
  playerScore: number;
  triggerEnemyDiceRolls: Subject<void> = new Subject<void>();
  triggerEnemyAttackType: Subject<void> = new Subject<void>();
  triggerNextMob: Subject<void> = new Subject<void>();

  constructor(private _diceService: DiceService, private _router: Router, private _dialog: MatDialog) { }

  ngOnInit() {
    this.currClass = sessionStorage.getItem("playersClass");
    switch(this.currClass) {
      case "Fighter":
        this.currentImage = "assets/images/Fighter.png";
        break;
      case "Ranger":
        this.currentImage = "assets/images/Ranger.png";
        break;
      case "BlackMage":
        this.currentImage = "assets/images/BlackMage.png";
        break;
    }
    this.enemyHealth = 10;
    this.playerHealth = 10;
    this.playerScore = 0;
    this.mobCounter = 1;
    this.delay(40).then( () => {
      this.triggerEnemyAttackType.next();
    });
  }

  getPlayersAttack($event) {
    this.playerDiceRolls = [];
    this.playersCurrentAttackType = $event;
    this.playerRoll();
    this.triggerEnemyDiceRolls.next();
    this.triggerEnemyAttackType.next();
  }

  getEnemyAttack($event) {
    this.enemyAttackTypeOnHtml = "Enemy plans on " + $event + "ing\nSelect your move";
    this.enemyCurrentAttackType = $event;
  }

  getEnemyDiceRolls($event) {
    this.enemyDiceRolls = $event;
    this.calculateDamage();
  }

  playerRoll() {
    forkJoin(
      this._diceService.roll(),
      this._diceService.roll(),
      this._diceService.roll(),
      this._diceService.roll(),
      this._diceService.roll(),
      this._diceService.roll()
    ).subscribe( ([dice1, dice2, dice3, dice4, dice5, dice6]) => {
      this.playerDiceRolls.push(this._diceService.addDice(dice1, this.playersCurrentAttackType));
      this.playerDiceRolls.push(this._diceService.addDice(dice2, this.playersCurrentAttackType));
      this.playerDiceRolls.push(this._diceService.addDice(dice3, this.playersCurrentAttackType));
      this.playerDiceRolls.push(this._diceService.addDice(dice4, this.playersCurrentAttackType));
      this.playerDiceRolls.push(this._diceService.addDice(dice5, this.playersCurrentAttackType));
      this.playerDiceRolls.push(this._diceService.addDice(dice6, this.playersCurrentAttackType));
    })
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout( () => {
      resolve(ms);
    }, ms));
  }

  calculateDiceRolls(): string {
    let playersAttack = 0;
    let playersDefense = 0;
    let playersCounter = 0;
    let flee = 0;
    let enemiesAttack = 0;
    let enemiesDefense = 0;
    let enemiesCounter = 0;

    for(let i = 0; i < 6; i++){
      if (this.playerDiceRolls[i]==="Attack"){
        playersAttack += 1;
      } else if (this.playerDiceRolls[i]==="Shield"){
        playersDefense += 1;
      } else if (this.playerDiceRolls[i]==="Counter"){
        playersCounter += 1;
      } else if (this.playerDiceRolls[i]==="Flee"){
        flee += 1;
      }
      if (this.enemyDiceRolls[i]==="Attack"){
        enemiesAttack += 1;
      } else if (this.enemyDiceRolls[i]==="Shield"){
        enemiesDefense += 1;
      } else if (this.enemyDiceRolls[i]==="Counter"){
        enemiesCounter += 1;
      }
    }
    return `${playersAttack},${playersDefense},${playersCounter},${flee},${enemiesAttack},${enemiesDefense},${enemiesCounter}`
  }
  calculateDamage() {
    let getDiceRolled: string[] = this.calculateDiceRolls().split(',');
    let playersAttack: number = JSON.parse(getDiceRolled[0]);
    let playersDefense: number = JSON.parse(getDiceRolled[1]);
    let playersCounter: number = JSON.parse(getDiceRolled[2]);
    let flee: number = JSON.parse(getDiceRolled[3]);
    let enemiesAttack: number = JSON.parse(getDiceRolled[4]);
    let enemiesDefense: number = JSON.parse(getDiceRolled[5]);
    let enemiesCounter: number = JSON.parse(getDiceRolled[6]);
    this.dmgDealt = 0;
    this.dmgBlocked = 0;
    this.dmgTaken = 0;
    if (playersAttack > enemiesDefense + enemiesCounter) {
      this.dmgDealt = playersAttack-enemiesDefense-enemiesCounter;
      this.enemyHealth -= playersAttack-enemiesDefense-enemiesCounter;
      this.playerScore += this.dmgDealt*30;
    }
    if (playersAttack > 0 && enemiesCounter > 0){
      if(playersAttack > enemiesCounter) {
        this.dmgTaken += enemiesCounter;
        this.playerHealth -= enemiesCounter;
      } else {
        this.dmgTaken += playersAttack;
        this.playerHealth -= playersAttack;
      }
      this.playerScore -= this.dmgTaken*12;
    }
    if (enemiesAttack > playersDefense + playersCounter) {
      this.dmgTaken = enemiesAttack-playersDefense-playersCounter;
      this.playerHealth -= enemiesAttack-playersDefense-playersCounter;
      this.dmgBlocked += playersDefense + playersCounter;
      this.playerScore -= this.dmgTaken*6;
    }
    if (enemiesAttack > 0 && playersCounter > 0){
      if(enemiesAttack > playersCounter) {
        this.dmgDealt += playersCounter;
        this.enemyHealth -= playersCounter;
      } else {
        this.dmgDealt += enemiesAttack;
        this.enemyHealth -= enemiesAttack;
      }
      this.playerScore += this.dmgDealt*20;
    }
    if (enemiesAttack <= playersCounter + playersDefense){
      this.dmgBlocked += enemiesAttack;
      this.playerScore += this.dmgBlocked*2;
    }
    if (flee > enemiesAttack) {
      this.playerScore -= 50;
      this.openEndingDialog('You ran away, Coward! Ending Score: ');
    }
    if (this.enemyHealth <= 0){
      this.enemyHealth = 10;
      sessionStorage.setItem('score', this.playerScore.toString());
      this.mobCounter = this.mobCounter+1;
      if ((sessionStorage.getItem('difficulty') === "Easy" && this.mobCounter === 3) || (sessionStorage.getItem('difficulty') === "Medium" && this.mobCounter === 4) || (sessionStorage.getItem('difficulty') === "Hard" && this.mobCounter === 5)) {
        this.openEndingDialog('You have Won! Ending Score: ');
      }
      this.triggerNextMob.next();
    }
    if(this.playerHealth <= 0){
      this.playerScore -= 25;
      this.openEndingDialog('You have Died! Ending Score: ');
    }
  }

  openEndingDialog(endingText: string) {
    let dialogRef = this._dialog.open(EndingDialogComponent, {
      width: '600px',
      data: endingText + this.playerScore
    });
    dialogRef.afterClosed().subscribe( () => {
      sessionStorage.setItem('score', this.playerScore.toString());
      this._router.navigate(['/scoreboard']);
    });
  }
}
