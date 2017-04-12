import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth.service'
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'

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
  user: any;
  prod: any;
  imageSrc: string = "assets/images/logo.png";
  imageUnused: boolean = true;
  product: string;
  productName: string;
  productBrand: string;
  productPrice: string;
  editPage: boolean = false;
  addPage: boolean = true;
  lastDialogResult: string;
  myRef: any;
  mine: any; 
  serverImagePath: string = "images";
  uploadUrl: string = "";
  imageRef: any;

  constructor(public af: AngularFire, private authService: AuthService, private router: Router, public route: ActivatedRoute) {



  }

  ngOnInit() {
    this.productList = this.af.database.list('/products');
    console.log('filelist', this.productList);
    console.log('my uid', this.authService.uid);

    this.loggedIn = this.authService.uid != null;
    this.admin = this.authService.uid == "GoObJLWJ23gMGQOwaqNkyQfTiXn1";

    // subscribe to any changes that may happen while on this page
    this.authService.user$.subscribe((uid: string) => {
      this.getUser(uid);

    });

    // if user is already logged in, get their information
    if (this.authService.uid) {
      this.getUser(this.authService.uid);
    }

  }


  getUser(uid: string) {
    this.af.database.object('/users/' + uid).subscribe((user: any) => {
      this.user = user;
      this.mine = this.af.database.list('/users/' + uid + '/cart')




    });


  }

  addToCart(itemKey: string) {
    this.af.database.object('/products/' + itemKey).subscribe((product: any) => {
      console.log(product, product.image, "I NEED tHIS!!!");
      this.product = product
      this.productName = product.name;
      this.productBrand = product.brand;
      this.productPrice = product.price;
      this.imageSrc = product.image;


    });
    this.mine.push({ name: this.productName, brand: this.productBrand, price: this.productPrice, image: this.imageSrc });
  }

}
