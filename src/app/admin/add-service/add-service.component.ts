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
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  serverImagePath: string = "images";
  uploadUrl: string = "";
  imageRef: any;
  imageSrc: string = "assets/images/logo.png";
  imageUnused: boolean = true;
  serviceName: string;
  serviceDesc: string;
  servicePrice: string;
  serviceList: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire, public router: Router) { }

  ngOnInit() {
    this.serviceList = this.af.database.list('/services');
    this.serviceList.forEach(element => {
      console.log(element);

    });
    console.log('services', this.serviceList);
  }

//   ngOnDestroy() {
//     console.log('Destroying');
//     if (this.imageRef && this.imageUnused) {
//       this.af.database.object(this.imageRef).remove();
//     }
//   }
  createProduct() {
    if (!(this.serviceName && this.serviceDesc && this.servicePrice)) {
      alert("all fields are required");
      return;
    }

    console.log('services', this.serviceName, this.serviceDesc, this.servicePrice);
    
    var ref = this.serviceList.push({ name: this.serviceName, desc: this.serviceDesc, price: this.servicePrice});
    this.router.navigate(['/services']);
  }
}
