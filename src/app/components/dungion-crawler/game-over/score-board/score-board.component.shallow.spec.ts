import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBoardComponent } from './score-board.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { ScoreBoardService } from 'src/app/services/score-board.service';
import { mockScoreBoardOne, mockScoreBoardList } from 'src/app/mocks/mockScoreBoard';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockScoreBoardService = {
  addScore: jasmine.createSpy('addScore').and.returnValue(of(mockScoreBoardOne)),
  getAllScores: jasmine.createSpy('getAllScores').and.returnValue(of(mockScoreBoardList))
}
describe('ScoreBoardComponent shallow', () => {
  let component: ScoreBoardComponent;
  let fixture: ComponentFixture<ScoreBoardComponent>;
  let service: ScoreBoardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreBoardComponent ],
      imports: [MatTableModule, MatPaginatorModule, BrowserAnimationsModule],
      providers: [{provide: ScoreBoardService, useValue: mockScoreBoardService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(ScoreBoardService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
