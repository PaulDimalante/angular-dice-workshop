import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyUIComponent } from './enemy-ui.component';
import { mockMobOrderEasy } from 'src/app/mocks/mockMobOrders';
import { of } from 'rxjs';
import { MobOrderService } from 'src/app/services/mob-order.service';
import { DiceService } from 'src/app/services/dice.service';

const mockMobOrderService = {
  createMobOrder: jasmine.createSpy('createMobOrder').and.returnValue(of(mockMobOrderEasy))
}
const mockDiceService = {
  roll: jasmine.createSpy('roll').and.returnValues(1,2,3,4,5,6)
}
const mockNextMob: any = {
  subscribe: jasmine.createSpy('subscribe').and.returnValue(fn => fn())
}
const mockEnemyAttackTypeEvent: any = {
  subscribe: jasmine.createSpy('subscribe').and.returnValue(fn => fn())
}
const mockEnemyDiceRollEvent: any = {
  subscribe: jasmine.createSpy('subscribe').and.returnValue(fn => fn())
}
describe('EnemyUIComponent shallow', () => {
  let component: EnemyUIComponent;
  let fixture: ComponentFixture<EnemyUIComponent>;
  let mobOrderService: MobOrderService;
  let diceService: DiceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnemyUIComponent ],
      providers: [{provide: DiceService, useValue: mockDiceService},
                  {provide: MobOrderService, useValue: mockMobOrderService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnemyUIComponent);
    component = fixture.componentInstance;
    component.nextMob = mockNextMob;
    component.enemyAttackTypeEvent = mockEnemyAttackTypeEvent;
    component.enemyDiceRollEvent = mockEnemyDiceRollEvent;
    fixture.detectChanges();
    mobOrderService = TestBed.get(MobOrderService);
    diceService = TestBed.get(DiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
