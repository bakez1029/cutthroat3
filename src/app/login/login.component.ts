import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2'
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
    onSubmit(formData) {
    if(formData.valid) {
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password,
        provider: AuthProviders.Password,
    
      }).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/account']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }
    
// loginGoogle() {
//   this.af.auth.login({
//     provider: AuthProviders.Google,
//     method: AuthMethods.Popup,
//   }).then(
//     (success) => {
//       this.router.navigate(['/account']);
//     }).catch(
//       (err) => {
//         this.error = err;
//       })
// }

  
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


