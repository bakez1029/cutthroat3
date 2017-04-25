import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2'
import { AuthService } from '../../auth.service'
import { Router } from '@angular/router'


import * as firebase from 'firebase';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  uid: string;
  email: string;
  password: string;
  loggedIn: boolean = false;

  error: any;


  constructor(public af: AngularFire, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.loggedIn = true;
      }
    });
  }

  sendPasswordEmail(email: string) {
    this.authService.sendPasswordResetEmail(email)
    alert("E-mail has been sent.")
    this.router.navigate(['/login']);
  }

  keyDownFunction(event, email: string) {
    if (event.keyCode == 13) {
    this.authService.sendPasswordResetEmail(email)
    alert("E-mail has been sent.")
    this.router.navigate(['/login']);
    }
  }

}


