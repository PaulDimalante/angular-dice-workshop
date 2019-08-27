import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceGameComponent } from './dice-game.component';
import { RollService } from 'src/app/roll.service';
import { AppComponent } from 'src/app/app.component';
import { of } from 'rxjs';

describe('DiceGameComponent', () => {
  let component: DiceGameComponent;
  let fixture: ComponentFixture<DiceGameComponent>;
  let service: RollService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiceGameComponent, AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(RollService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isGameStarted', () => {
    it('should return false if games has not started', () => {
      expect(component.isGameStarted()).toBe(false);
    });

    it('should return true after StartGame() is called', () => {
      expect(component.isGameStarted()).toBe(false);
      component.startGame();
      expect(component.isGameStarted()).toBe(true);
    });
  });

  describe('playerRoll', () => {
    it('should add random roll between 1-6 to playerDiceList', () => {
      spyOn(service, 'roll').and.returnValues(of(1), of(3), of(6));
      expect(component.playerDiceList).toEqual([]);

      component.playerRoll();
      expect(component.playerDiceList).toEqual([1]);

      component.playerRoll();
      expect(component.playerDiceList).toEqual([1,3]);

      component.playerRoll();
      expect(component.playerDiceList).toEqual([1,3,6]);
      
    });
  });

  describe('isGameLost', () => {
    it('should lose game if players total > 12', () => {
      spyOn(service, 'roll').and.returnValues(of(4), of(3), of(6));
      expect(component.playerDiceList).toEqual([]);

      component.playerRoll();
      expect(component.isGameLost()).toEqual(false);

      component.playerRoll();
      expect(component.isGameLost()).toEqual(false);

      component.playerRoll();
      expect(component.isGameLost()).toEqual(true);
    });

    it('shoud lose if oppoent rolls 12 or more than you', () => {
      component.playerDiceList = [4,4];
      component.opponentDiceList = [5,5];
      expect(component.isGameLost()).toBe(true);

      component.opponentDiceList = [4,4];
      expect(component.isGameLost()).toBe(true);
    });

    it('should return false if player has not rolled yet', () => {
      component.playerDiceList = [];
      expect(component.isGameLost()).toBe(false);
    });

    it('should not compare scores if the opponent does not have exactly 2 die', () => {
      component.playerDiceList = [1,1,1];
      component.opponentDiceList = [5];
      expect(component.isGameLost()).toBe(false);

      component.opponentDiceList = [5,5];
      expect(component.isGameLost()).toBe(true);
    });
  });

  describe('opponentRoll', () => {
    it("should add random roll between 1-6 to opponentDiceList", () => {
      spyOn(service,'roll').and.returnValues(of(1), of(3), of(6));
      expect(component.opponentDiceList).toEqual([]);

      component.opponentRoll();
      expect(component.opponentDiceList).toEqual([1]);

      component.opponentRoll();
      expect(component.opponentDiceList).toEqual([1,3]);

      component.opponentRoll();
      expect(component.opponentDiceList).toEqual([1,3,6]);
    });
  });

  describe('startGame', () => {
    it('should roll 1 dice for opponent', () => {
      spyOn(service, 'roll').and.returnValue(of(4));

      component.startGame();
      expect(service.roll).toHaveBeenCalledTimes(1);
      expect(component.opponentDiceList).toEqual([4]);
    });
  });

  // describe('quit', () => {
  //   it('should close window when quit button is pressed', () => {
  //     const appFixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
  //     const appComponent: AppComponent = fixture.componentInstance;
  
  //     expect(appComponent).toBeTruthy();

  //     appComponent.quit();
  //     expect(appComponent).toBeFalsy();
  //   });
  // });
});
