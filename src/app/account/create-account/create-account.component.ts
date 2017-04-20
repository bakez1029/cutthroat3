import { Component, OnInit, Optional } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  selectedOption: string;
  lastDialogResult: string;

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  password2: string = "";


  constructor(private dialog: MdDialog, private router: Router, private authService: AuthService, private location: Location) { }

  ngOnInit() {
  }

  openDialog(firstName: string, lastName: string, email: string, password: string) {

    if (!this.email || this.email.length < 5 || !this.password || this.password.length < 5) {
        this.authService.createNewUser({ first: firstName, last: lastName, email: email, password: password });
    
    }

    let dialogRef = this.dialog.open(DialogContent);
    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
      this.router.navigate(['/account']);

    });
  }

  goBack() {
    this.location.back();
  }

  keyDownFunction(event, firstName: string, lastName: string, email: string, password: string) {
    if (event.keyCode == 13) {
      if (!this.email || this.email.length < 5 || !this.password || this.password.length < 5) {
        this.authService.createNewUser({ first: firstName, last: lastName, email: email, password: password });
        this.router.navigate(['/account']);
      }

    }
  }

}


@Component({
  template: `

  <br>
    <p class="text-center" style="color: #000">Thank you, <br><br> your new account has been created.</p>
  
  `,
})
export class DialogContent {
  constructor( @Optional() public dialogRef: MdDialogRef<DialogContent>) { }
}