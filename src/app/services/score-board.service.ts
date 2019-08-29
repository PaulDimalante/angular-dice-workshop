import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Scoreboard } from '../models/Scoreboard';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { mockMobOrderList } from '../mocks/mockMobOrders';
import { mockScoreBoardList, mockScoreBoardOne } from '../mocks/mockScoreBoard';

@Injectable({
  providedIn: 'root'
})
export class ScoreBoardService {

  constructor(private _httpClient: HttpClient) { }

  getAllScores() : Observable<Scoreboard[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._httpClient.get<Scoreboard[]>(environment.scoreBoardController, httpOptions);
  }

  addScore(currScore: Scoreboard) : Observable<Scoreboard> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._httpClient.post<Scoreboard>(environment.scoreBoardController, currScore, httpOptions);
  }
}
