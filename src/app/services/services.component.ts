import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth.service'
import { Observable } from 'rxjs';

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
  constructor(public af: AngularFire, private authService: AuthService) { }

  ngOnInit() {
    this.serviceList = this.af.database.list('/services');
    console.log('filelist', this.serviceList);
  
    console.log('my uid', this.authService.uid);
    
    this.loggedIn = this.authService.uid != null;
    this.admin = this.authService.uid == "GoObJLWJ23gMGQOwaqNkyQfTiXn1";

  }

    removeProd() {
    console.log('Product Removed');
      this.serviceList[1].$key.remove();
    
  }

}
