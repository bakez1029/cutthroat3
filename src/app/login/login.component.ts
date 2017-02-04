import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uid: string;
  email: string;
  password: string;

  constructor(public af: AngularFire, private authService: AuthService) {
  }

  ngOnInit() {
    //this.logout();
    this.sendPasswordEmail();
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
  }

  sendPasswordEmail() {
    this.authService.sendPasswordResetEmail("tbaker000@gmail.com");
  }

}
