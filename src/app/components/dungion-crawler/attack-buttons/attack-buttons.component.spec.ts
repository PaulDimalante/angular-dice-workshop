import { AttackButtonsComponent } from './attack-buttons.component';
import { fakeAsync, tick } from '@angular/core/testing';

describe('AttackButtonsComponent', () => {
  let component: AttackButtonsComponent;

  beforeEach(() => {
    component = new AttackButtonsComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the dataSource to empty on startup', () => {
    let mockMatTableDataSource: any = {
      data: 'hello'
    }
    component.dataSource = mockMatTableDataSource;
    component.ngOnInit();
    expect(component.dataSource.data).toEqual([{}]);
  });

  it('should send the button clicked back up to the parent component', fakeAsync(() => {
    component.isDisabled = true;
    let mockEventEmitter: any = {
      emit: jasmine.createSpy('emit')
    };
    let mockThen: any = {
      then: fn => fn()
    }
    component.currentPlayerCommand = mockEventEmitter;
    spyOn(component, 'delay').and.returnValue(mockThen);
    component.buttonClicked("Attack");
    expect(component.currentPlayerCommand.emit).toHaveBeenCalledTimes(1);
    expect(component.currentPlayerCommand.emit).toHaveBeenCalledWith("Attack");
    expect(component.isDisabled).toBeFalsy();

  }));

  it('should delay for 2 seconds', fakeAsync(() => {
    let delayedValue: boolean = false;
    component.delay(2000).then( () => {
      delayedValue = true;
    });
    expect(delayedValue).toBeFalsy();
    tick(50);
    expect(delayedValue).toBeFalsy();
    tick(1950);
    expect(delayedValue).toBeTruthy();
  }));
});
