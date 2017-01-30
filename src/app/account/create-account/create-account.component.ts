import { Component, OnInit, Optional } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  selectedOption: string;
  lastDialogResult: string;

  constructor(private dialog: MdDialog, private router: Router) { }

  ngOnInit() {
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
      this.router.navigate(['/home']);
    })
  }
}


@Component({
  template: `
    <p>Thank you, your user has been created</p>
    <p> <button md-button (click)="dialogRef.close()">CLOSE</button> </p>
  `,
})
export class DialogContent {
  constructor(@Optional() public dialogRef: MdDialogRef<DialogContent>) { }
}