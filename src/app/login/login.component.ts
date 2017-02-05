import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2'
import { AuthService } from '../auth.service'

import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uid: string;
  email: string;
  password: string;
  loggedIn: boolean = false;

  constructor(public af: AngularFire, private authService: AuthService) {
  }

  ngOnInit() {
    
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.loggedIn = true;
      }
    });
  }

  login() {
    this.authService.login(this.email, this.password).then((auth) => {
      this.uid = auth.uid;
      console.log('xxuser => ', this.uid);
      this.email = "";
      this.password = "";
    }).catch((error) => {
      console.log('Error', error);
    });
  }

  logout() {
    this.authService.logout();
    console.log('logged out');
    this.uid = "";
    this.loggedIn = false;    
  }

  sendPasswordEmail() {
    this.authService.sendPasswordResetEmail("tbaker000@gmail.com");
  }

}
