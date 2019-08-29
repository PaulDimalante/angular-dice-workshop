import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  classSelected : string = "";
  difficultySelected : string = "";
  isDisabled: boolean = true;
  username: string = "";

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  playerClass(currClass: string) {
    this.classSelected = currClass + " selected";
    sessionStorage.setItem('playersClass', currClass);
    this.checkStartButton();
  }

  difficulty(difficulty: string) {
    this.difficultySelected = difficulty + " selected";
    sessionStorage.setItem('difficulty', difficulty);
    this.checkStartButton();
  }

  startGame() {
    sessionStorage.setItem('username', this.username);
    this._router.navigate(['dungion']);
  }

  checkStartButton() {
    if(this.classSelected != "" && this.difficultySelected != "" && this.username != ""){
      this.isDisabled = false;
    }
  }
}
