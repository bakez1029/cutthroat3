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
  selector: 'app-photo-product',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  serverImagePath: string = "images";
  uploadUrl: string = "";
  imageRef: any;
  imageSrc: string = "assets/images/logo.png";
  imageUnused: boolean = true;
  photoName: string;
  photoList: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire, public router: Router) { }

  ngOnInit() {
    this.photoList = this.af.database.list('/photo');
    this.photoList.forEach(element => {
      console.log(element);

    });
    console.log('photo', this.photoList);
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
        //var imageRef = af.database.list(`/${this.serverImagePath}/`).push({ path: path, filename: selectedFile.name })
        this.uploadUrl = snapshot.downloadURL;
        this.imageSrc = this.uploadUrl;
       // this.imageRef = imageRef;
      });
    }
  }


  createPhoto() {
    if (!(this.photoName)) {
      alert("all fields are required");
      return;
    }

    console.log('photo', this.photoName);
    
    var ref = this.photoList.push({ name: this.photoName, image: this.uploadUrl });
    this.imageUnused = false;
    this.router.navigate(['/photos']);
  }
}
