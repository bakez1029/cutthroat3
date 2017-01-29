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

  constructor(public af: AngularFire, private authService: AuthService) {
  }

  ngOnInit() {

    this.authService.logout();

    this.authService.login('tbaker000@gmail.com', 'dipdip11').then((auth) => {
      this.uid = auth.uid;
      console.log('xxuser => ', this.uid);
    }).catch((error) => {
        console.log('Error', error);
      });
    }

}
