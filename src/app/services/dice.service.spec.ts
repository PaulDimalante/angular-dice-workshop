import { TestBed } from '@angular/core/testing';
import { DiceService } from './dice.service';

describe('DiceService', () => {
  let service: DiceService;

  beforeEach(() => { TestBed.configureTestingModule({
    })
    service = TestBed.get(DiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should roll a random number between 1 and 6', ()=> {
    spyOn(Math, 'random').and.returnValues(.10, .20, .35, .55, .75, .85);
    service.roll().subscribe(num => {
      expect(num).toBe(1);
    });
    service.roll().subscribe(num => {
      expect(num).toBe(2);
    });
    service.roll().subscribe(num => {
      expect(num).toBe(3);
    });
    service.roll().subscribe(num => {
      expect(num).toBe(4);
    });
    service.roll().subscribe(num => {
      expect(num).toBe(5);
    });
    service.roll().subscribe(num => {
      expect(num).toBe(6);
    });
  });

  it('should return the image Attack.png otherwise Nothing.png', () => {
    expect(service.addDice(1, "Attack")).toBe("Attack");
    expect(service.addDice(2, "Attack")).toBe("Attack");
    expect(service.addDice(3, "Attack")).toBe("Attack");
    expect(service.addDice(4, "Attack")).toBe("Nothing");
    expect(service.addDice(5, "Attack")).toBe("Nothing");
    expect(service.addDice(6, "Attack")).toBe("Nothing");
  });

  it('should return the image Counter.png otherwise Nothing.png', () => {
    expect(service.addDice(1, "Counter")).toBe("Counter");
    expect(service.addDice(2, "Counter")).toBe("Counter");
    expect(service.addDice(3, "Counter")).toBe("Shield");
    expect(service.addDice(4, "Counter")).toBe("Nothing");
    expect(service.addDice(5, "Counter")).toBe("Nothing");
    expect(service.addDice(6, "Counter")).toBe("Nothing");
  });

  it('should return the image Shield.png otherwise Nothing.png', () => {
    expect(service.addDice(3, "Counter")).toBe("Shield");
    expect(service.addDice(1, "Defend")).toBe("Shield");
    expect(service.addDice(2, "Defend")).toBe("Shield");
    expect(service.addDice(3, "Defend")).toBe("Shield");
    expect(service.addDice(4, "Defend")).toBe("Shield");
    expect(service.addDice(5, "Defend")).toBe("Nothing");
    expect(service.addDice(6, "Defend")).toBe("Nothing");
  });

  it('should return the image Flee.png otherwise Nothing.png', () => {
    expect(service.addDice(1, "Flee")).toBe("Flee");
    expect(service.addDice(2, "Flee")).toBe("Flee");
    expect(service.addDice(3, "Flee")).toBe("Nothing");
    expect(service.addDice(4, "Flee")).toBe("Nothing");
    expect(service.addDice(5, "Flee")).toBe("Nothing");
    expect(service.addDice(6, "Flee")).toBe("Nothing");
  });


});