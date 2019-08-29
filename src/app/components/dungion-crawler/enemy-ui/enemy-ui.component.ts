import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MobOrder } from 'src/app/models/MobOrder';
import { ClassListEnum } from 'src/app/enum/ClassListEnum';
import { MobOrderService } from 'src/app/services/mob-order.service';
import { DiceService } from 'src/app/services/dice.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-enemy-ui',
  templateUrl: './enemy-ui.component.html',
  styleUrls: ['./enemy-ui.component.css']
})
export class EnemyUIComponent implements OnInit {

  @Output() enemyDiceRolls = new EventEmitter<string[]>();
  @Output() attackType = new EventEmitter<string>();
  @Input() enemyDiceRollEvent: Observable<void>;
  @Input() enemyAttackTypeEvent: Observable<void>;
  @Input() nextMob: Observable<void>;
  mobOrder: MobOrder = new MobOrder;
  mobCounter: number;
  currentImage: string = "";
  enemyAttackType: string = "";

  constructor(private _mobOrderService: MobOrderService, private _rollDiceService: DiceService) { }

  ngOnInit() {
    this.mobCounter = 1;
    this._mobOrderService.createMobOrder(sessionStorage.getItem("difficulty")).subscribe( response => {
      this.mobOrder = response;
      switch(this.mobOrder.mob1){
        case ClassListEnum.Black_Mage:
          this.currentImage = "assets/images/EnemyBlackMage.png";
          break;
        case ClassListEnum.Fighter:
          this.currentImage = "assets/images/EnemyFighter.png";
          break;
        case ClassListEnum.Ranger:
          this.currentImage = "assets/images/EnemyRanger.png";
      }
    });
    this.getNextMob();
    this.getEnemyAttackType();
    this.triggerEnemyDiceRoll();
  }

  getNextMob() {
    this.nextMob.subscribe( () => {
      this.mobCounter += 1;
      switch(this.mobCounter){
        case 2:
          switch(this.mobOrder.mob2){
            case ClassListEnum.Black_Mage:
              this.currentImage = "assets/images/EnemyBlackMage.png";
              break;
            case ClassListEnum.Fighter:
              this.currentImage = "assets/images/EnemyFighter.png";
              break;
            case ClassListEnum.Ranger:
              this.currentImage = "assets/images/EnemyRanger.png";
          }
          break;
        case 3:
          switch(this.mobOrder.mob3){
            case ClassListEnum.Black_Mage:
              this.currentImage = "assets/images/EnemyBlackMage.png";
              break;
            case ClassListEnum.Fighter:
              this.currentImage = "assets/images/EnemyFighter.png";
              break;
            case ClassListEnum.Ranger:
              this.currentImage = "assets/images/EnemyRanger.png";
          }
          break;
        case 4:
          switch(this.mobOrder.mob4){
            case ClassListEnum.Black_Mage:
              this.currentImage = "assets/images/EnemyBlackMage.png";
              break;
            case ClassListEnum.Fighter:
              this.currentImage = "assets/images/EnemyFighter.png";
              break;
            case ClassListEnum.Ranger:
              this.currentImage = "assets/images/EnemyRanger.png";
          }
      }
    });
  }

  getEnemyAttackType() {
    this.enemyAttackTypeEvent.subscribe( () => {
      this._rollDiceService.roll().subscribe(response => {
        switch(response){
          case 1:
          case 2:
            this.enemyAttackType = "Attack";
            this.attackType.emit("Attack");
            break;
          case 3:
          case 4:
            this.enemyAttackType = "Counter";
            this.attackType.emit("Counter");
            break;
          case 5:
          case 6:
            this.enemyAttackType = "Defend";
            this.attackType.emit("Defend");
        }
      })
    });
  }

  triggerEnemyDiceRoll() {
    this.enemyDiceRollEvent.subscribe( () => {
      let enemiesDiceRolls: string[] = [];

      forkJoin(
        this._rollDiceService.roll(),
        this._rollDiceService.roll(),
        this._rollDiceService.roll(),
        this._rollDiceService.roll(),
        this._rollDiceService.roll(),
        this._rollDiceService.roll()
      ).subscribe( ([dice1, dice2, dice3, dice4, dice5, dice6]) => {
        enemiesDiceRolls.push(this._rollDiceService.addDice(dice1, this.enemyAttackType));
        enemiesDiceRolls.push(this._rollDiceService.addDice(dice2, this.enemyAttackType));
        enemiesDiceRolls.push(this._rollDiceService.addDice(dice3, this.enemyAttackType));
        enemiesDiceRolls.push(this._rollDiceService.addDice(dice4, this.enemyAttackType));
        enemiesDiceRolls.push(this._rollDiceService.addDice(dice5, this.enemyAttackType));
        enemiesDiceRolls.push(this._rollDiceService.addDice(dice6, this.enemyAttackType));
        this.enemyDiceRolls.emit(enemiesDiceRolls);
      })
    });
  }
}
