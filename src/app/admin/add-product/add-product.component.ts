import { Component, Input, OnInit, OnDestroy, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

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
  product: string;
  productName: string;
  productBrand: string;
  productPrice: string;
  productList: FirebaseListObservable<any[]>;
  editPage: boolean = false;
  addPage: boolean = true;
  lastDialogResult: string;
  myRef: any;
  selectedOption: string;re




  constructor(public af: AngularFire, public router: Router, public route: ActivatedRoute, private dialog: MdDialog, private location: Location) {
    if (this.route.snapshot.url.length == 4 && this.route.snapshot.url[2].path == 'edit') {

      this.editPage = true;
      if (this.editPage = true) {
        this.addPage = false

      }
      // go get product info for product id (this.route.snapshot.params['id'])
      this.af.database.object('/products/' + this.route.snapshot.params['id']).subscribe((product: any) => {
        console.log(product, "LOOK HERE");
        this.product = product
        this.productName = product.name;
        this.productBrand = product.brand;
        this.productPrice = product.price;
        this.imageSrc = product.image;

      });


    }

    console.log(this.editPage, this.route.snapshot.url, this.route.snapshot.params, this.route.snapshot.params['id']);
    this.myRef = this.af.database.object('/products/' + this.route.snapshot.params['id'])
  }

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

  updateProduct(name: string, brand: string, price: string, image: string) {
    if (this.uploadUrl == "") {
      console.log("Picture has not changed.")
      this.myRef.update({ name: this.productName, brand: this.productBrand, price: this.productPrice });
      alert('Product Updated!');
      this.router.navigate(['/products']);
    } else {
      this.myRef.update({ name: this.productName, brand: this.productBrand, price: this.productPrice, image: this.uploadUrl });
      alert('Product Updated!');
      this.router.navigate(['/products']);
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


  openDialog() {

    let dialogRef = this.dialog.open(DialogContent2, {
      height: '500px',
      width: '500px',
    });
  

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
      if (result == 'yes') {
        this.af.database.object('/products/' + this.route.snapshot.params['id']).remove()
        alert('Product Deleted!');
        this.router.navigate(['/products']);
    }
      if (result == 'no') {
        console.log("Product Not Deleted")
        this.router.navigate(['/products']);
      }

    });
  }
  }



@Component({
  template: `

  <md-dialog-content>
  <p class="text-center" style="color: #000">Are you sure you want to do this?</p>
  </md-dialog-content>
  <md-dialog-actions>

    <button md-raised-button color="primary" style="margin-right:20px; margin-left:80px" (click)="dialogRef.close('yes')">Yes</button><button md-raised-button color="warn" (click)="dialogRef.close('no')">No</button>

  </md-dialog-actions>

  
  
  `,
})
export class DialogContent2 {
  constructor( @Optional() public af: AngularFire, public router: Router, public route: ActivatedRoute, private dialog: MdDialog, private location: Location, public dialogRef: MdDialogRef<DialogContent2>) { }
selectedOption: string;
    yesButton() {
    this.selectedOption = "yes";
    console.log("YES BUTTON WAS PUSHED")
  }
  noButton() {
    this.selectedOption = "no";
    console.log("NO BUTTON WAS PUSHED")
  }


}
