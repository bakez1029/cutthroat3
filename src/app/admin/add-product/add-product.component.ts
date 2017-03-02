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
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  serverImagePath: string = "images";
  uploadUrl: string = "";
  imageRef: any;
  imageSrc: string = "assets/images/logo.png";
  imageUnused: boolean = true;
  productName: string;
  productBrand: string;
  productPrice: string;
  productList: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire, public router: Router) { }

  ngOnInit() {
    this.productList = this.af.database.list('/products');
    this.productList.forEach(element => {
      console.log(element);

    });
    console.log('products', this.productList);
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


  createProduct() {
    if (!(this.productName && this.productBrand && this.productPrice && this.uploadUrl)) {
      alert("all fields are required");
      return;
    }

    console.log('product', this.productName, this.productBrand, this.productPrice);
    
    var ref = this.productList.push({ name: this.productName, brand: this.productBrand, price: this.productPrice, image: this.uploadUrl });
    this.imageUnused = false;
    this.router.navigate(['/products']);
  }
}
