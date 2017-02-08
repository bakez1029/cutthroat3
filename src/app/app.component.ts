import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2'
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public af: AngularFire, private authService: AuthService) { }

  ngOnInit() {
    // we subscribe here so the users auth will get called as soon as a user loads the website
    // this way there won't be a delay in lookuping up the users auth later
    this.af.auth.subscribe(auth => {
      if (auth) {
        var x = auth;
      }
    });
  }
}
