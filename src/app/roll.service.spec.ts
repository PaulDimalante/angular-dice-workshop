import { TestBed } from '@angular/core/testing';

import { RollService } from './roll.service';

describe('RollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RollService = TestBed.get(RollService);
    expect(service).toBeTruthy();
  });

  it('should return a random integer between 1 and 6', () => {
    spyOn(Math, 'random').and.returnValues(0.00,0.25,0.99);
    const service: RollService = TestBed.get(RollService);
    service.roll().subscribe(num => {
        expect(num).toBe(1);
    });
    service.roll().subscribe(num => {
      expect(num).toBe(2);
    });
    service.roll().subscribe(num => {
      expect(num).toBe(6);
    });
  });
});
