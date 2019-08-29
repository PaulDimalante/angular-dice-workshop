import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator} from '@angular/material';
import { Scoreboard } from 'src/app/models/Scoreboard';
import { ScoreBoardService } from 'src/app/services/score-board.service';
import { ClassListEnum } from 'src/app/enum/ClassListEnum';
import { DifficultyEnum } from 'src/app/enum/DifficultyEnum';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {

  displayedColumns: string[] = ["playersScore", "playersName", "playersClass", "difficulty"];
  dataSource: MatTableDataSource<Scoreboard>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _scoreBoardService: ScoreBoardService) { }

  ngOnInit() {
    let playersClass = sessionStorage.getItem('playersClass');
    let difficulty = sessionStorage.getItem('difficulty');

    let convertClass: ClassListEnum;
    let convertDifficulty: DifficultyEnum;
    switch(playersClass){
      case "Fighter":
        convertClass = ClassListEnum.Fighter;
        break;
      case "Ranger":
        convertClass = ClassListEnum.Ranger;
        break;
      case "BlackMage":
        convertClass = ClassListEnum.Black_Mage;
    }
    switch(difficulty){
      case "Easy":
        convertDifficulty = DifficultyEnum.Easy;
        break;
      case "Medium":
        convertDifficulty = DifficultyEnum.Medium;
        break;
      case "Hard":
        convertDifficulty = DifficultyEnum.Hard;
    }
    let currScore: Scoreboard = {
      playersScore : parseInt(sessionStorage.getItem('score')),
      playersName : sessionStorage.getItem('username'),
      playersClass : convertClass,
      difficulty : convertDifficulty
    };
    this.addScoreToBackend(currScore);
  }

  addScoreToBackend(currScore: Scoreboard) {
    this._scoreBoardService.addScore(currScore).subscribe( () => {
      this._scoreBoardService.getAllScores().subscribe( response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

}
