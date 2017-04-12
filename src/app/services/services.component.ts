import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth.service'
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  serviceList: FirebaseListObservable<any[]>;
  authed: any;
  uid: string;
  admin: boolean;
  loggedIn: boolean = false;
  constructor(public af: AngularFire, private authService: AuthService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.serviceList = this.af.database.list('/services');
    console.log('filelist', this.serviceList);
  
    console.log('my uid', this.authService.uid);
    
    this.loggedIn = this.authService.uid != null;
    this.admin = this.authService.uid == "GoObJLWJ23gMGQOwaqNkyQfTiXn1";

  }

}
