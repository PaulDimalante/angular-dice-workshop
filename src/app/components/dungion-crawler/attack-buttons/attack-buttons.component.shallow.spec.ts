import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackButtonsComponent } from './attack-buttons.component';
import { MatTableModule } from '@angular/material';

describe('AttackButtonsComponent', () => {
  let component: AttackButtonsComponent;
  let fixture: ComponentFixture<AttackButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttackButtonsComponent ],
      imports: [MatTableModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttackButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
