import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authed: any;
  uid: string;
  admin: boolean;
  loggedIn: boolean = false;


  constructor(public af: AngularFire, private router: Router, private authService: AuthService) { }



  ngOnInit() {
    // we subscribe here so the users auth will get called as soon as a user loads the website
    // this way there won't be a delay in lookuping up the users auth later
    this.af.auth.subscribe(auth => {
      this.authed = auth;
      if (auth && this.authed.uid == "GoObJLWJ23gMGQOwaqNkyQfTiXn1") {
        this.admin = true
        this.loggedIn = true;
        console.log("HELLO ADMIN")
      } else {
        console.log("NOT AN ADMIN")
        this.admin = false
      }

    });
  }
  logout() {
    this.authService.logout();
    console.log('logged out');
    this.uid = "";
    this.loggedIn = false; 
    this.router.navigate(['/home']);
  }


   onClick(): void {
    this.router.navigate(['/services']);

  }
    onClick2(): void {
        this.router.navigate(['/products']);

    }
    onClick3(): void {
        this.router.navigate(['/jobs']);
    }

    onClick4(): void {
        this.router.navigate(['/barbers']);
    }
 

}





