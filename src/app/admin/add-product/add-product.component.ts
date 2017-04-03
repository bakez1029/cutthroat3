import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  product: string;
  productName: string;
  productBrand: string;
  productPrice: string;
  productList: FirebaseListObservable<any[]>;
  editPage: boolean = false;
  addPage: boolean = true;

  myRef: any;



  constructor(public af: AngularFire, public router: Router, public route: ActivatedRoute) {
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
  removeProd(key: string) {
    this.af.database.object('/products/' + this.route.snapshot.params['id']).remove()
    alert('Product Deleted!');
    this.router.navigate(['/products']);
  }

}
