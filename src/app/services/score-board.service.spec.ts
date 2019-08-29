import { TestBed } from '@angular/core/testing';

import { ScoreBoardService } from './score-board.service';
import { HttpHeaders } from '@angular/common/http';
import { mockScoreBoardList, mockScoreBoardOne } from '../mocks/mockScoreBoard';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('ScoreBoardService', () => {
  let service: ScoreBoardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    service = TestBed.get(ScoreBoardService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the scores ', () => {
    const mockHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    service.getAllScores().subscribe(response => {
      expect(response).toBe(mockScoreBoardList);
    });

    let request = httpMock.expectOne(environment.scoreBoardController);
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Content-Type')).toBe(mockHttpOptions.headers.get('Content-Type'));
    request.flush(mockScoreBoardList);
  });
  
  it('should add a score to the scoreboard', () => {
    const mockHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    service.addScore(mockScoreBoardOne).subscribe(response => {
      expect(response).toBe(mockScoreBoardOne);
    });

    let request = httpMock.expectOne(environment.scoreBoardController);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Content-Type')).toBe(mockHttpOptions.headers.get('Content-Type'));
    request.flush(mockScoreBoardOne);
  });
});
