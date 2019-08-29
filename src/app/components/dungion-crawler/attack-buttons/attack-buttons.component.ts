import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-attack-buttons',
  templateUrl: './attack-buttons.component.html',
  styleUrls: ['./attack-buttons.component.css']
})
export class AttackButtonsComponent implements OnInit {

  displayedColumns : string[] = ['attack', 'counterattack', 'defend', 'flee'];
  dataSource = new MatTableDataSource();
  isDisabled = false;
  @Output() currentPlayerCommand = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    let dataaa = [{}];
    this.dataSource.data = dataaa;
  }

  buttonClicked(currentCommand: string) {
    this.currentPlayerCommand.emit(currentCommand);
    this.isDisabled = true;
    this.delay(2000).then( () => {
      this.isDisabled = false;
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout( () => {
      resolve(ms);
    }, ms));
  }
}
