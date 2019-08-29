import { EnemyUIComponent } from './enemy-ui.component';
import { Observable, of } from 'rxjs';
import { mockMobOrderEasy, mockMobOrderMedium, mockMobOrderHard, mockMobOrderMob3, mockMobOrderMob4Fighter, mockMobOrderMob4Ranger } from 'src/app/mocks/mockMobOrders';

const mockMobOrderService = {
  createMobOrder: jasmine.createSpy('createMobOrder').and.returnValues(of(mockMobOrderEasy), of(mockMobOrderMedium), of(mockMobOrderHard))
}
class mockDiceService {
  constructor() {}

  roll(): Observable<number> {
    return of();
  }

  addDice(response: number, attackType: string): string {
    return 'Does not matter';
  }
}
const mockNextMob: any = {
  subscribe: jasmine.createSpy('subscribe').and.callFake(fn=>fn())
}
const mockEnemyAttackTypeEvent: any = {
  subscribe: jasmine.createSpy('subscribe').and.callFake(fn=>fn())
}
const mockEnemyDiceRollEvent: any = {
  subscribe: jasmine.createSpy('subscribe').and.callFake(fn=>fn())
}
describe('EnemyUIComponent', () => {
  let component: EnemyUIComponent;
  let mobOrderService: any;
  let diceService: any;

  beforeEach(() => {
    mobOrderService = mockMobOrderService;
    diceService = new mockDiceService();
    component = new EnemyUIComponent(mobOrderService, diceService);
    component.nextMob = mockNextMob;
    component.enemyAttackTypeEvent = mockEnemyAttackTypeEvent;
    component.enemyDiceRollEvent = mockEnemyDiceRollEvent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a get a mobOrder from the service with mob1 = Ranger', () => {
    spyOn(component, 'getNextMob');
    spyOn(component, 'getEnemyAttackType');
    spyOn(component, 'triggerEnemyDiceRoll');
    component.mobCounter = 0;
    sessionStorage.setItem('difficulty', 'Easy');
    component.ngOnInit();
    expect(mobOrderService.createMobOrder).toHaveBeenCalledTimes(1);
    expect(mobOrderService.createMobOrder).toHaveBeenCalledWith('Easy');
    expect(component.mobCounter).toEqual(1);
    expect(component.currentImage).toEqual('assets/images/EnemyRanger.png');
    expect(component.getNextMob).toHaveBeenCalledTimes(1);
    expect(component.getNextMob).toHaveBeenCalledWith();
    expect(component.getEnemyAttackType).toHaveBeenCalledTimes(1);
    expect(component.getEnemyAttackType).toHaveBeenCalledWith();
    expect(component.triggerEnemyDiceRoll).toHaveBeenCalledTimes(1);
    expect(component.triggerEnemyDiceRoll).toHaveBeenCalledWith();
  });

  it('should send a get a mobOrder from the service with mob1 = Fighter', () => {
    spyOn(component, 'getNextMob');
    spyOn(component, 'getEnemyAttackType');
    spyOn(component, 'triggerEnemyDiceRoll');
    component.mobCounter = 0;
    sessionStorage.setItem('difficulty', 'Medium');
    component.ngOnInit();
    expect(mobOrderService.createMobOrder).toHaveBeenCalledTimes(2);
    expect(mobOrderService.createMobOrder).toHaveBeenCalledWith('Medium');
    expect(component.mobCounter).toEqual(1);
    expect(component.currentImage).toEqual('assets/images/EnemyFighter.png');
    expect(component.getNextMob).toHaveBeenCalledTimes(1);
    expect(component.getNextMob).toHaveBeenCalledWith();
    expect(component.getEnemyAttackType).toHaveBeenCalledTimes(1);
    expect(component.getEnemyAttackType).toHaveBeenCalledWith();
    expect(component.triggerEnemyDiceRoll).toHaveBeenCalledTimes(1);
    expect(component.triggerEnemyDiceRoll).toHaveBeenCalledWith();
  });

  it('should send a get a mobOrder from the service with mob1 = Black Mage', () => {
    spyOn(component, 'getNextMob');
    spyOn(component, 'getEnemyAttackType');
    spyOn(component, 'triggerEnemyDiceRoll');
    component.mobCounter = 0;
    sessionStorage.setItem('difficulty', 'Hard');
    component.ngOnInit();
    expect(mobOrderService.createMobOrder).toHaveBeenCalledTimes(3);
    expect(mobOrderService.createMobOrder).toHaveBeenCalledWith('Hard');
    expect(component.mobCounter).toEqual(1);
    expect(component.currentImage).toEqual('assets/images/EnemyBlackMage.png');
    expect(component.getNextMob).toHaveBeenCalledTimes(1);
    expect(component.getNextMob).toHaveBeenCalledWith();
    expect(component.getEnemyAttackType).toHaveBeenCalledTimes(1);
    expect(component.getEnemyAttackType).toHaveBeenCalledWith();
    expect(component.triggerEnemyDiceRoll).toHaveBeenCalledTimes(1);
    expect(component.triggerEnemyDiceRoll).toHaveBeenCalledWith();
  });

  describe('should call the get the next Mob in the order and grab the correct image', () => {
    it('should be Fighter on mobCounter = 2', () => {
      component.mobCounter = 1;
      component.mobOrder = mockMobOrderEasy;
      component.currentImage = '';
      component.getNextMob();

      expect(component.nextMob.subscribe).toHaveBeenCalled();
      expect(component.mobCounter).toEqual(2);
      expect(component.currentImage).toEqual('assets/images/EnemyFighter.png');
    });

    it('should be BlackMage on mobCounter = 2', () => {
      component.mobCounter = 1;
      component.mobOrder = mockMobOrderMedium;
      component.currentImage = '';
      component.getNextMob();

      expect(component.mobCounter).toEqual(2);
      expect(component.currentImage).toEqual('assets/images/EnemyBlackMage.png');
    });

    it('should be Ranger on mobCounter = 2', () => {
      component.mobCounter = 1;
      component.mobOrder = mockMobOrderHard;
      component.currentImage = '';
      component.getNextMob();

      expect(component.mobCounter).toEqual(2);
      expect(component.currentImage).toEqual('assets/images/EnemyRanger.png');
    });

    it('should be Fighter on mobCounter = 3', () => {
      component.mobCounter = 2;
      component.mobOrder = mockMobOrderHard;
      component.currentImage = '';
      component.getNextMob();

      expect(component.mobCounter).toEqual(3);
      expect(component.currentImage).toEqual('assets/images/EnemyFighter.png');
    });

    it('should be BlackMage on mobCounter = 3', () => {
      component.mobCounter = 2;
      component.mobOrder = mockMobOrderMob3;
      component.currentImage = '';
      component.getNextMob();

      expect(component.mobCounter).toEqual(3);
      expect(component.currentImage).toEqual('assets/images/EnemyBlackMage.png');
    });

    it('should be Ranger on mobCounter = 3', () => {
      component.mobCounter = 2;
      component.mobOrder = mockMobOrderMedium;
      component.currentImage = '';
      component.getNextMob();

      expect(component.mobCounter).toEqual(3);
      expect(component.currentImage).toEqual('assets/images/EnemyRanger.png');
    });

    it('should be Fighter on mobCounter = 4', () => {
      component.mobCounter = 3;
      component.mobOrder = mockMobOrderMob4Fighter;
      component.currentImage = '';
      component.getNextMob();

      expect(component.mobCounter).toEqual(4);
      expect(component.currentImage).toEqual('assets/images/EnemyFighter.png');
    });

    it('should be BlackMage on mobCounter = 4', () => {
      component.mobCounter = 3;
      component.mobOrder = mockMobOrderHard;
      component.currentImage = '';
      component.getNextMob();

      expect(component.mobCounter).toEqual(4);
      expect(component.currentImage).toEqual('assets/images/EnemyBlackMage.png');
    });

    it('should be Ranger on mobCounter = 4', () => {
      component.mobCounter = 3;
      component.mobOrder = mockMobOrderMob4Ranger;
      component.currentImage = '';
      component.getNextMob();

      expect(component.mobCounter).toEqual(4);
      expect(component.currentImage).toEqual('assets/images/EnemyRanger.png');
    });
  }); 

  describe('get the enemys next intended attack type so the player can respond', () => {
    it('should emit an attack back up to the parent and set the local attackType', () => {
      const mockEventEmitter:any = {
        emit: jasmine.createSpy('emit')
      }
      spyOn(diceService, 'roll').and.returnValues(of(1), of(2));
      component.enemyAttackType = '';
      component.attackType = mockEventEmitter;

      component.getEnemyAttackType();
      expect(component.enemyAttackTypeEvent.subscribe).toHaveBeenCalled();
      expect(diceService.roll).toHaveBeenCalledTimes(1);
      expect(diceService.roll).toHaveBeenCalledWith();
      expect(component.enemyAttackType).toEqual('Attack');
      expect(mockEventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('Attack');

      component.enemyAttackType = '';
      component.getEnemyAttackType();
      expect(diceService.roll).toHaveBeenCalledTimes(2);
      expect(component.enemyAttackType).toEqual('Attack');
      expect(mockEventEmitter.emit).toHaveBeenCalledTimes(2);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('Attack');

    });

    it('should emit an counter back up to the parent and set the local attackType', () => {
      const mockEventEmitter:any = {
        emit: jasmine.createSpy('emit')
      }
      spyOn(diceService, 'roll').and.returnValues(of(3), of(4));
      component.enemyAttackType = '';
      component.attackType = mockEventEmitter;

      component.getEnemyAttackType();
      expect(diceService.roll).toHaveBeenCalledTimes(1);
      expect(diceService.roll).toHaveBeenCalledWith();
      expect(component.enemyAttackType).toEqual('Counter');
      expect(mockEventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('Counter');

      component.enemyAttackType = '';
      component.getEnemyAttackType();
      expect(diceService.roll).toHaveBeenCalledTimes(2);
      expect(component.enemyAttackType).toEqual('Counter');
      expect(mockEventEmitter.emit).toHaveBeenCalledTimes(2);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('Counter');
    });

    it('should emit an defend back up to the parent and set the local attackType', () => {
      const mockEventEmitter:any = {
        emit: jasmine.createSpy('emit')
      }
      spyOn(diceService, 'roll').and.returnValues(of(5), of(6));
      component.enemyAttackType = '';
      component.attackType = mockEventEmitter;

      component.getEnemyAttackType();
      expect(diceService.roll).toHaveBeenCalledTimes(1);
      expect(diceService.roll).toHaveBeenCalledWith();
      expect(component.enemyAttackType).toEqual('Defend');
      expect(mockEventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('Defend');

      component.enemyAttackType = '';
      component.getEnemyAttackType();
      expect(diceService.roll).toHaveBeenCalledTimes(2);
      expect(component.enemyAttackType).toEqual('Defend');
      expect(mockEventEmitter.emit).toHaveBeenCalledTimes(2);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('Defend');
    });
  });

  it('should trigger enemy Dice roll', () => {
    const mockEnemyDiceRolls: any = {
      emit: jasmine.createSpy('emit')
    }
    spyOn(diceService, 'roll').and.returnValues(of(1), of(4), of(2), of(5), of(3), of(6));
    spyOn(diceService, 'addDice').and.returnValues('Attack', 'Nothing', 
                                                  'Attack', 'Nothing', 
                                                  'Attack', 'Nothing');
    component.enemyAttackType = 'Attack';
    component.enemyDiceRolls = mockEnemyDiceRolls;
    component.triggerEnemyDiceRoll();
    expect(mockEnemyDiceRollEvent.subscribe).toHaveBeenCalledTimes(1);
    expect(mockEnemyDiceRolls.emit).toHaveBeenCalledTimes(1);
    expect(mockEnemyDiceRolls.emit).toHaveBeenCalledWith(['Attack', 'Nothing', 
                                              'Attack', 'Nothing',
                                              'Attack', 'Nothing']);
    expect(diceService.roll).toHaveBeenCalledTimes(6);
    expect(diceService.addDice).toHaveBeenCalledTimes(6);
  });
});
