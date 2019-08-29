import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EndingDialogComponent } from './ending-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('EndingDialogComponent', () => {
  let component: EndingDialogComponent;
  let fixture: ComponentFixture<EndingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndingDialogComponent ],
      imports: [MatDialogModule],
      providers: [
          {provide: MatDialogRef, useValue: ({})},
          {provide: MAT_DIALOG_DATA, useValue: {data: 'Data Info'}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
