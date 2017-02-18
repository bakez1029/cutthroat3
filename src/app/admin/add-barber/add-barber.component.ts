import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs';

import * as firebase from 'firebase';

interface Image {
  path: string;
  filename: string;
  downloadURL?: string;
  $key?: string;
}

@Component({
  selector: 'app-add-barber',
  templateUrl: './add-barber.component.html',
  styleUrls: ['./add-barber.component.css']
})
export class AddBarberComponent implements OnInit {
serverImagePath: string = "images";
  uploadUrl: string = "";
  imageRef: any;
  imageSrc: string = "assets/images/barbers/jonny.jpg";
  imageUnused: boolean = true;
  barberName: string;
  barberList: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire, public router: Router) { }

  ngOnInit() {
    this.barberList = this.af.database.list('/barbers');
    this.barberList.forEach(element => {
      console.log(element);

    });
    console.log('barbers', this.barberList);
  }

  ngOnDestroy() {
    console.log('Destroying');
    if (this.imageRef && this.imageUnused) {
      this.af.database.object(this.imageRef).remove();
    }
  }

  onChange(event) {
    console.log('event', event);

    let storageRef = firebase.storage().ref();
    let success = false;

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
      if (this.imageRef) {
        this.af.database.object(this.imageRef).remove();
      }

      // Make local copies of services because "this" will be clobbered - todo - verify this statement
      let router = this.router;
      let af = this.af;
      let path = `/${this.serverImagePath}/${selectedFile.name}`;

      var iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        var imageRef = af.database.list(`/${this.serverImagePath}/`).push({ path: path, filename: selectedFile.name })
        this.uploadUrl = snapshot.downloadURL;
        this.imageSrc = this.uploadUrl;
        this.imageRef = imageRef;
      });
    }
  }


  createBarber() {
    if (!(this.barberName)) {
      alert("all fields are required");
      return;
    }

    console.log('barber', this.barberName);
    
    var ref = this.barberList.push({ name: this.barberName, image: this.uploadUrl});
    this.imageUnused = false;
  }
}
