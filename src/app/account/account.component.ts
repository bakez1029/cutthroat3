import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService, public af: AngularFire) { }

  ngOnInit() {
    console.log('account uid', this.authService.uid);
    
    this.user = this.af.database.object('/users/' + this.authService.uid );

    console.log('user', this.user, this.authService.authUser);
    
  }

}
