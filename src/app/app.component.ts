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
  mine: any;
  user: any;


  constructor(public af: AngularFire, private router: Router, private authService: AuthService) { }



  ngOnInit() {
    // we subscribe here so the users auth will get called as soon as a user loads the website
    // this way there won't be a delay in lookuping up the users auth later
    this.af.auth.subscribe(auth => {
      this.authed = auth;
      if ((auth && this.authed.uid == "GoObJLWJ23gMGQOwaqNkyQfTiXn1") || (auth && this.authed.uid == "Z1ZVuCi3izVtJLykVjTFqmEqozr1")) {
        this.admin = true
        this.loggedIn = true;
        console.log("HELLO ADMIN")
      } else {
        console.log("NOT AN ADMIN")
        this.admin = false
      }

    });

    // subscribe to any changes that may happen while on this page
    this.authService.user$.subscribe((uid: string) => {
      this.getUser(uid);

    });

    // if user is already logged in, get their information
    if (this.authService.uid) {
      this.getUser(this.authService.uid);
    }




    console.log(this.mine, "Right Here")

  }
  logout() {
    this.authService.logout();
    console.log('logged out');
    this.uid = "";
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }

  getUser(uid: string) {
    this.af.database.object('/users/' + uid).subscribe((user: any) => {
      this.user = user;
      this.mine = this.af.database.list('/users/' + uid + '/cart')




    });
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


  removeItem(key: string) {
    console.log('key', key);
    this.mine.remove(key);

  }


}





