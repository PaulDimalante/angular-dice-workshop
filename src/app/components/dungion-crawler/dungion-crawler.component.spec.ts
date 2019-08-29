import { DungionCrawlerComponent } from './dungion-crawler.component';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { EndingDialogComponent } from './game-over/ending-dialog/ending-dialog.component';

class DiceService {

  constructor(){}

  roll() {}

  addDice(response: number, attackType: string) {}
}

describe('DungionCrawlerComponent', () => {
  let component: DungionCrawlerComponent;
  let mockRouter: any;
  let mockDiceService: any;
  let mockDialog: any;
  let mockDialogRef: any;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    let mockSubscribe: any = {
      subscribe: fn => fn()
    }
    mockDialogRef = {
      afterClosed: jasmine.createSpy('afterClosed').and.returnValue(mockSubscribe)
    }
    mockDialog = {
      open: jasmine.createSpy('open').and.returnValue(mockDialogRef)
    }
    mockDiceService = new DiceService();
    component = new DungionCrawlerComponent(mockDiceService, mockRouter, mockDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should grab the current class selected from sessionStorage on startup', () => {
    sessionStorage.setItem("playersClass", "Ranger");
    component.ngOnInit();
    expect(component.currClass).toEqual("Ranger");
  });

  it('should set the image of the player to the class selected if Fighter', () => {
    sessionStorage.setItem("playersClass", "Fighter");
    component.ngOnInit();
    expect(component.currentImage).toEqual("assets/images/Fighter.png");
  });

  it('should set the image of the player to the class selected if Ranger', () => {
    sessionStorage.setItem("playersClass", "Ranger");
    component.ngOnInit();
    expect(component.currentImage).toEqual("assets/images/Ranger.png");
  });

  it('should set the image of the player to the class selected if Black Mage', () => {
    sessionStorage.setItem("playersClass", "BlackMage");
    component.ngOnInit();
    expect(component.currentImage).toEqual("assets/images/BlackMage.png");
  });

  describe("setup", () => {
    it('should setup enemyHP, playerHP, playerScore, mobCounter', () => {
      component.enemyHealth = 0;
      component.playerHealth = 0;
      component.playerScore = 10000;
      component.mobCounter = 10000;
      component.ngOnInit();
      expect(component.enemyHealth).toEqual(10);
      expect(component.playerHealth).toEqual(10);
      expect(component.playerScore).toEqual(0);
      expect(component.mobCounter).toEqual(1);
    });

    it('should delay for 40 then call .next on our Subject to get the push event from our child', () => {
      const mockSubject: any = {
        next : jasmine.createSpy('next')
      }
      component.triggerEnemyAttackType = mockSubject;
      let mockthen: any = {
        then: fn => fn()
      }
      spyOn(component, 'delay').and.returnValue(mockthen);
      component.ngOnInit();
      expect(component.delay).toHaveBeenCalled();
      expect(component.triggerEnemyAttackType.next).toHaveBeenCalled();
    });
  });

  it('should grab the attackType, reset the dice rolled, and emit them to the child', () => {
    const mockEnemyAttackType: any = {
      next : jasmine.createSpy('next')
    }
    const mockEnemyDiceRolls: any = {
      next : jasmine.createSpy('next')
    }
    component.playerDiceRolls.push("3");
    component.playersCurrentAttackType = "";
    component.triggerEnemyDiceRolls = mockEnemyDiceRolls;
    component.triggerEnemyAttackType = mockEnemyAttackType;
    spyOn(component, 'playerRoll');
    component.getPlayersAttack('Attack');
    expect(component.playerDiceRolls).toEqual([]);
    expect(component.playersCurrentAttackType).toEqual("Attack");
    expect(component.triggerEnemyDiceRolls.next).toHaveBeenCalledTimes(1);
    expect(component.triggerEnemyAttackType.next).toHaveBeenCalledTimes(1);
    expect(component.playerRoll).toHaveBeenCalledTimes(1);
  });

  it('should set the enemyAttackTypeOnHtml, and the enemies current attack type TS', () => {
    component.enemyAttackTypeOnHtml = "";
    component.enemyCurrentAttackType = "";
    component.getEnemyAttack("Attack");
    const fakeString: string = "Enemy plans on Attacking\nSelect your move";
    expect(component.enemyAttackTypeOnHtml).toEqual(fakeString);
    expect(component.enemyCurrentAttackType).toEqual("Attack");
  });

  it('should get the enemies dice, and call calculateDamage', () => {
    spyOn(component, 'calculateDamage');
    component.enemyDiceRolls = [];
    const fakeArray: string[] = ["Attack", "Defend", "Flee"];
    component.getEnemyDiceRolls(fakeArray);
    expect(component.enemyDiceRolls).toBe(fakeArray);
    expect(component.calculateDamage).toHaveBeenCalledTimes(1);
  });

  it('should call playerRoll 6 times using a forkjoin', fakeAsync(() => {
    spyOn(mockDiceService, 'roll').and.returnValues(of(1), of(4), of(2), of(5), of(3), of(6));
    spyOn(mockDiceService, 'addDice').and.returnValues("Attack", "Nothing", "Attack", "Nothing", "Attack", "Nothing");
    const mockAddDice: string[] = ["Attack", "Nothing", "Attack", "Nothing", "Attack", "Nothing"];
    component.playerDiceRolls = [];
    component.playersCurrentAttackType = "Attack";
    component.playerRoll(); 
    tick(100);
    expect(mockDiceService.roll).toHaveBeenCalledTimes(6);
    expect(mockDiceService.addDice).toHaveBeenCalledTimes(6);
    expect(component.playerDiceRolls).toEqual(mockAddDice);
  }));

  it('should open our injected dialog, and once closed, saves player score and navigates to scoreboard', () => {
    component.playerScore = 1290;
    component.openEndingDialog("You're awesome");
    expect(mockDialog.open).toHaveBeenCalledTimes(1);
    expect(mockDialog.open).toHaveBeenCalledWith(EndingDialogComponent, {
      width: '600px',
      data: "You're awesome" + component.playerScore
    });
    expect(mockDialogRef.afterClosed).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem('score')).toEqual("1290");
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
  });

  it('should calculate all dice rolls and return the result', () => {
    component.playerDiceRolls = ["Attack", "Shield", "Counter", "Flee", "Attack", "Shield"];
    component.enemyDiceRolls = ["Attack", "Shield", "Counter", "Attack", "Shield", "Counter"];
    let result: string = component.calculateDiceRolls();
    let mockedString: string = "2,2,1,1,2,2,2";
    expect(result).toEqual(mockedString);
  });
  it('should calculate damage if playersAttack > enemiesDefense + enemiesCounter', () => {
    component.dmgDealt = 0;
    component.enemyHealth = 10;
    component.playerScore = 0;
    component.dmgTaken = 0;
    component.playerHealth = 10;
    //playersAttack, playersDefense, playersCounter, flee, 
    //enemiesAttack, enemiesDefense, enemiesCounter
    let mockedString: string = "3,0,0,0,0,2,0";
    spyOn(component, 'calculateDiceRolls').and.returnValue(mockedString);
    component.calculateDamage();
    expect(component.calculateDiceRolls).toHaveBeenCalled();
    expect(component.dmgDealt).toEqual(1);
    expect(component.enemyHealth).toEqual(9);
    expect(component.playerScore).toEqual(30);
  });

  it('should calculate damage if playersAttack > 0 && enemiesCounter > 0', () => {
    component.dmgDealt = 0;
    component.enemyHealth = 10;
    component.playerScore = 0;
    component.dmgTaken = 0;
    component.playerHealth = 10;
    //playersAttack, playersDefense, playersCounter, flee, 
    //enemiesAttack, enemiesDefense, enemiesCounter
    let mockedString: string = "4,0,0,0,0,0,2";
    spyOn(component, 'calculateDiceRolls').and.returnValue(mockedString);
    component.calculateDamage();
    expect(component.dmgDealt).toEqual(2);
    expect(component.enemyHealth).toEqual(8);
    expect(component.dmgTaken).toEqual(2);
    expect(component.playerHealth).toEqual(8);
    expect(component.playerScore).toEqual(36);
  });

  it('should calculate damage if playersAttack <= enemiesCounter', () => {
    component.dmgDealt = 0;
    component.enemyHealth = 10;
    component.playerScore = 0;
    component.dmgTaken = 0;
    component.playerHealth = 10;
    //playersAttack, playersDefense, playersCounter, flee, 
    //enemiesAttack, enemiesDefense, enemiesCounter
    let mockedString: string = "4,0,0,0,0,0,4";
    spyOn(component, 'calculateDiceRolls').and.returnValue(mockedString);
    component.calculateDamage();
    expect(component.dmgDealt).toEqual(0);
    expect(component.enemyHealth).toEqual(10);
    expect(component.dmgTaken).toEqual(4);
    expect(component.playerHealth).toEqual(6);
    expect(component.playerScore).toEqual(-48);
  });

  it('should calculate damage if enemiesAttack > playersDefense + playersCounter', () => {
    component.dmgDealt = 0;
    component.enemyHealth = 10;
    component.playerScore = 0;
    component.dmgTaken = 0;
    component.playerHealth = 10;
    component.dmgBlocked = 0;
    //playersAttack, playersDefense, playersCounter, flee, 
    //enemiesAttack, enemiesDefense, enemiesCounter
    let mockedString: string = "0,3,0,0,4,0,0";
    spyOn(component, 'calculateDiceRolls').and.returnValue(mockedString);
    component.calculateDamage();
    expect(component.dmgTaken).toEqual(1);
    expect(component.playerHealth).toEqual(9);
    expect(component.dmgBlocked).toEqual(3);
    expect(component.playerScore).toEqual(-6);
  });

  it('should calculate damage if enemiesAttack > 0 && playersCounter > 0', () => {
    component.dmgDealt = 0;
    component.enemyHealth = 10;
    component.playerScore = 0;
    //playersAttack, playersDefense, playersCounter, flee, 
    //enemiesAttack, enemiesDefense, enemiesCounter
    let mockedString: string = "0,1,2,0,4,0,0";
    spyOn(component, 'calculateDiceRolls').and.returnValue(mockedString);
    component.calculateDamage();
    expect(component.dmgDealt).toEqual(2);
    expect(component.enemyHealth).toEqual(8);
    expect(component.playerScore).toEqual(34);
  });

  it('should calculate damage if enemiesAttack == playersCounter', () => {
    component.dmgDealt = 0;
    component.enemyHealth = 10;
    component.playerScore = 0;
    //playersAttack, playersDefense, playersCounter, flee, 
    //enemiesAttack, enemiesDefense, enemiesCounter
    let mockedString: string = "0,0,4,0,4,0,0";
    spyOn(component, 'calculateDiceRolls').and.returnValue(mockedString);
    component.calculateDamage();
    expect(component.dmgDealt).toEqual(4);
    expect(component.enemyHealth).toEqual(6);
    expect(component.playerScore).toEqual(88);
  });

  it('should calculate damage if enemiesAttack <= playersCounter + playersDefense', () => {
    component.dmgBlocked = 0;
    component.playerScore = 0;

    //playersAttack, playersDefense, playersCounter, flee, 
    //enemiesAttack, enemiesDefense, enemiesCounter
    let mockedString: string = "0,2,0,0,2,0,0";
    spyOn(component, 'calculateDiceRolls').and.returnValue(mockedString);
    component.calculateDamage();
    expect(component.dmgBlocked).toEqual(2);
    expect(component.playerScore).toEqual(4);

  });

  it('should flee > enemiesAttack', () => {
    component.playerScore = 0;
    //playersAttack, playersDefense, playersCounter, flee, 
    //enemiesAttack, enemiesDefense, enemiesCounter
    let mockedString: string = "0,0,0,3,0,0,0";
    spyOn(component, 'calculateDiceRolls').and.returnValue(mockedString);
    spyOn(component, 'openEndingDialog');
    component.calculateDamage();
    expect(component.playerScore).toEqual(-50);
    expect(component.openEndingDialog).toHaveBeenCalledTimes(1);
    expect(component.openEndingDialog).toHaveBeenCalledWith('You ran away, Coward! Ending Score: ');
  });

  it('should set the players score, increase mob counter, and check for end of game', () => {
    let mockNextMob: any = {
      next: jasmine.createSpy('next')
    }
    component.enemyHealth = 0;
    component.playerScore = 1219;
    component.mobCounter = 2;
    component.triggerNextMob = mockNextMob;
    sessionStorage.setItem('difficulty', 'Easy');
    spyOn(component, 'openEndingDialog');

    component.calculateDamage();
    expect(component.openEndingDialog).toHaveBeenCalledTimes(1);
    expect(component.openEndingDialog).toHaveBeenCalledWith('You have Won! Ending Score: ');
    expect(component.mobCounter).toEqual(3);
    expect(sessionStorage.getItem('score')).toEqual("1219");
    expect(component.enemyHealth).toEqual(10);
    expect(component.triggerNextMob.next).toHaveBeenCalledTimes(1);
  });

  it('should set the players score, increase mob counter, and generate next mob for medium', () => {
    let mockNextMob: any = {
      next: jasmine.createSpy('next')
    }
    component.enemyHealth = 0;
    component.playerScore = 1519;
    component.mobCounter = 3;
    component.triggerNextMob = mockNextMob;
    sessionStorage.setItem('difficulty', 'Medium');
    spyOn(component, 'openEndingDialog');

    component.calculateDamage();
    expect(component.openEndingDialog).toHaveBeenCalledTimes(1);
    expect(component.openEndingDialog).toHaveBeenCalledWith('You have Won! Ending Score: ');
    expect(component.mobCounter).toEqual(4);
    expect(sessionStorage.getItem('score')).toEqual("1519");
    expect(component.enemyHealth).toEqual(10);
    expect(component.triggerNextMob.next).toHaveBeenCalledTimes(1);
  });

  it('should set the players score, increase mob counter, and generate next mob for hard', () => {
    let mockNextMob: any = {
      next: jasmine.createSpy('next')
    }
    component.enemyHealth = 0;
    component.playerScore = 1712;
    component.mobCounter = 4;
    component.triggerNextMob = mockNextMob;
    sessionStorage.setItem('difficulty', 'Hard');
    spyOn(component, 'openEndingDialog');

    component.calculateDamage();
    expect(component.openEndingDialog).toHaveBeenCalledTimes(1);
    expect(component.openEndingDialog).toHaveBeenCalledWith('You have Won! Ending Score: ');
    expect(component.mobCounter).toEqual(5);
    expect(sessionStorage.getItem('score')).toEqual("1712");
    expect(component.enemyHealth).toEqual(10);
    expect(component.triggerNextMob.next).toHaveBeenCalledTimes(1);
  });

  it('should check if player died', () => {
    component.playerScore = 0;
    component.playerHealth = 0;
    spyOn(component, 'openEndingDialog');
    component.calculateDamage();
    expect(component.playerScore).toEqual(-25);
    expect(component.openEndingDialog).toHaveBeenCalledTimes(1);
    expect(component.openEndingDialog).toHaveBeenCalledWith('You have Died! Ending Score: ');
  });

  it('should delay for 40 ms', fakeAsync(() => {
    let called: boolean = false;
    component.delay(40).then(() => {
      called = true;
    });
    expect(called).toBeFalsy();
    tick(20);
    expect(called).toBeFalsy();
    tick(20);
    expect(called).toBeTruthy();
  }));
});