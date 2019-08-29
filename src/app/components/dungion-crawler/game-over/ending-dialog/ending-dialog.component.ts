import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ending-dialog',
  templateUrl: './ending-dialog.component.html',
  styleUrls: ['./ending-dialog.component.css']
})
export class EndingDialogComponent implements OnInit {
  username: string = "";

  constructor(private _dialogRef: MatDialogRef<EndingDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: string) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

  onCloseConfirm() {
    this._dialogRef.close("Confirm");
  }
}
