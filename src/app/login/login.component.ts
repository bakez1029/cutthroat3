import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'


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

  login() {
    this.authService.login(this.email, this.password).then((auth) => {
      this.uid = auth.uid;
      console.log('xxuser => ', this.uid);
      this.email = "";
      this.password = "";
       this.router.navigate(['/account']);
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

  keyDownFunction(event, email: string, password: string) {
  if(event.keyCode == 13) {
       this.authService.login(this.email, this.password).then((auth) => {
      this.uid = auth.uid;
      console.log('xxuser => ', this.uid);
      this.email = "";
      this.password = "";
       this.router.navigate(['/account']);
    }).catch((error) => {
      console.log('Error', error);
    });
  }
}

  sendPasswordEmail() {
    this.authService.sendPasswordResetEmail("tbaker000@gmail.com");
  }



}
