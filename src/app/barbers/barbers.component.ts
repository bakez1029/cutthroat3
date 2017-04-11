import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.component.html',
  styleUrls: ['./barbers.component.css']
})
export class BarbersComponent implements OnInit {
  barberList: FirebaseListObservable<any[]>;
  barber: any;
  authed: any;
  admin: boolean;
  loggedIn: boolean = false;

  key: string;
  myRef: any;

  barberName: string;



  constructor(public af: AngularFire, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {

    //let myRef = this.af.database.list('/barbers')
    
    // myRef.subscribe((barber) => {
    //   this.barber = barber;
    
    //   console.log(barber, this.barber[0].$key)
    // });


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
    this.barberList = this.af.database.list('/barbers');


    console.log('filelist', this.barberList);

  }

  removeBarb(key: string) {
    console.log('key', key);
    this.barberList.remove(key);
    //alert('Barber Deleted!');
    //this.router.navigate(['/barbers']);

  }
  deleteItem(key: string) {
    this.barber.remove(key);
  }
}
