import { ScoreBoardComponent } from './score-board.component';
import { mockScoreBoardList, mockScoreBoardOne, mockScoreBoardThree, mockScoreBoardTwo } from 'src/app/mocks/mockScoreBoard';
import { of } from 'rxjs';

describe('ScoreBoardComponent', () => {
  let component: ScoreBoardComponent;
  let service: any;

  beforeEach(() => {
    service = {
      addScore: jasmine.createSpy('addScore').and.returnValue(of(fn => fn())),
      getAllScores: jasmine.createSpy('getAllScores').and.returnValue(of(mockScoreBoardList))
    }
   component = new ScoreBoardComponent(service);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a player model and send a request', () => {
    sessionStorage.setItem('playersClass', 'Fighter');
    sessionStorage.setItem('difficulty', 'Hard');
    sessionStorage.setItem('username', 'Wargods3');
    sessionStorage.setItem('score', '951');
    spyOn(component, 'addScoreToBackend');
    component.ngOnInit();
    expect(component.addScoreToBackend).toHaveBeenCalledTimes(1);
    expect(component.addScoreToBackend).toHaveBeenCalledWith(mockScoreBoardOne);
  });

  it('should make a player model and send a request', () => {
    sessionStorage.setItem('playersClass', 'BlackMage');
    sessionStorage.setItem('difficulty', 'Easy');
    sessionStorage.setItem('username', 'RaiseTheRoof');
    sessionStorage.setItem('score', '431');
    spyOn(component, 'addScoreToBackend');
    component.ngOnInit();
    expect(component.addScoreToBackend).toHaveBeenCalledTimes(1);
    expect(component.addScoreToBackend).toHaveBeenCalledWith(mockScoreBoardTwo);
  });

  it('should make a player model and send a request', () => {
    sessionStorage.setItem('playersClass', 'Ranger');
    sessionStorage.setItem('difficulty', 'Medium');
    sessionStorage.setItem('username', 'KitDaKat');
    sessionStorage.setItem('score', '689');
    spyOn(component, 'addScoreToBackend');
    component.ngOnInit();
    expect(component.addScoreToBackend).toHaveBeenCalledTimes(1);
    expect(component.addScoreToBackend).toHaveBeenCalledWith(mockScoreBoardThree);
  });

  it('should add the current score, then get all scores', () => {
    const mockDataSource: any = {
      paginator: 'Does not matter'
    };
    component.dataSource = mockDataSource;
    component.addScoreToBackend(mockScoreBoardOne);
    expect(service.addScore).toHaveBeenCalledTimes(1);
    expect(service.addScore).toHaveBeenCalledWith(mockScoreBoardOne);
    expect(service.getAllScores).toHaveBeenCalledTimes(1);
    expect(service.getAllScores).toHaveBeenCalled();
    expect(component.dataSource.data).toBe(mockScoreBoardList);
    expect(component.dataSource.paginator).toEqual(component.paginator);
  });
});
