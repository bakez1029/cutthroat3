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

  login(email: string, password: string) {
    if (this.error) {
      alert("There was an error. Please try again")
    } else {
      this.af.auth.login({ email: email, password: password, provider: AuthProviders.Password });
      this.router.navigate(['/account']);

    }


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

  keyDownFunction(event, email: string, password: string) {
    if (event.keyCode == 13) {
      this.af.auth.login({ email: email, password: password, provider: AuthProviders.Password });
      this.router.navigate(['/account']);
      // rest of your code
    }
  }

}


