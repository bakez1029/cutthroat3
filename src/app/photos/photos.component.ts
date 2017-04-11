import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photoList: FirebaseListObservable<any[]>;
  photo: any;
  authed: any;
  admin: boolean;
  loggedIn: boolean = false;

  key: string;
  myRef: any;

  photoName: string;



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
    this.photoList = this.af.database.list('/photo');


    console.log('filelist', this.photoList);

  }

  removePhoto(key: string) {
    console.log('key', key);
    this.photoList.remove(key);
    //alert('Barber Deleted!');
    //this.router.navigate(['/barbers']);

  }
  deleteItem(key: string) {
    this.photo.remove(key);
  }
}
