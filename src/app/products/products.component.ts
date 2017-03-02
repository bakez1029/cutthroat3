import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth.service'
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: FirebaseListObservable<any[]>;
  authed: any;
  uid: string;
  admin: boolean;
  loggedIn: boolean = false;
  constructor(public af: AngularFire, private authService: AuthService) { }

  ngOnInit() {
    this.productList = this.af.database.list('/products');
    console.log('filelist', this.productList);
    // we subscribe here so the users auth will get called as soon as a user loads the website
    // this way there won't be a delay in lookuping up the users auth later
    // this.af.auth.subscribe(auth => {
    //   this.authed = auth;
    //   if (auth && this.authed.uid == "GoObJLWJ23gMGQOwaqNkyQfTiXn1") {
    //     this.admin = true
    //     this.loggedIn = true;
    //     console.log("HELLO ADMIN")
    //   } else {
    //     console.log("NOT AN ADMIN")
    //     this.admin = false
    //   }

    // });
    console.log('my uid', this.authService.uid);
    
    this.loggedIn = this.authService.uid != null;
    this.admin = this.authService.uid == "GoObJLWJ23gMGQOwaqNkyQfTiXn1";

  }

    removeProd() {
    console.log('Product Removed');
      this.productList[1].$key.remove();
    
  }

}
