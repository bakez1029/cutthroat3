import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: FirebaseListObservable<any[]>;
  constructor(public af: AngularFire) { }

  ngOnInit() {
    this.productList = this.af.database.list('/products');
    console.log('filelist', this.productList);

  }

}
