import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  serverImagePath: string = "images";
  uploadUrl: string = "";
  imagePath: any;
  imageSrc: string = "assets/images/logo.png";

  constructor(public af: AngularFire, public router: Router) { }

  ngOnInit() {

  }

  onChange(event) {
    console.log('event', event);

    let storageRef = firebase.storage().ref();
    let success = false;

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
      console.log(selectedFile);

      if (this.imagePath) {
        //let storagePath = this.imagePath;
        //let referencePath = `${this.folder}/` + image.$key;

        // Do these as two separate steps so you can still try delete ref if file no longer exists

        // Delete from Storage
        // firebase.storage().ref().child(storagePath).delete()
        //     .then(
        //     () => { },
        //     (error) => console.error("Error deleting stored file", storagePath)
        //     );

        // Delete references
        this.af.database.object(this.imagePath).remove()
      }

      // Make local copies of services because "this" will be clobbered
      let router = this.router;
      let af = this.af;
      let path = `/${this.serverImagePath}/${selectedFile.name}`;
      console.log('path', path, 'selectedFile.name', selectedFile.name);
      
      var iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        var poo = af.database.list(`/${this.serverImagePath}/`).push({ path: path, filename: selectedFile.name })
        console.log('poo', poo);
        
        
        this.uploadUrl = snapshot.downloadURL;
        this.imageSrc = this.uploadUrl;
        console.log('url', this.uploadUrl);
        this.imagePath = poo;
        console.log('image', this.imagePath);

      });


    }

  }

}
