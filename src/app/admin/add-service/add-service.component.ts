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

  service: string;
  serviceName: string;
  serviceDesc: string;
  servicePrice: string;
  serviceList: FirebaseListObservable<any[]>;
  editPage: boolean = false;
  addPage: boolean = true;
  lastDialogResult: string;
  myRef: any;
  selectedOption: string;

  constructor(public af: AngularFire, public router: Router, public route: ActivatedRoute, private dialog: MdDialog, private location: Location) { 
    if (this.route.snapshot.url.length == 4 && this.route.snapshot.url[2].path == 'edit') {
      this.editPage = true;
      if (this.editPage = true) {
        this.addPage = false

      }

          // go get product info for product id (this.route.snapshot.params['id'])
      this.af.database.object('/services/' + this.route.snapshot.params['id']).subscribe((service: any) => {
        console.log(service.name, service.desc, service.price, "LOOK HERE!!!!!!!!!!!!!!!!!!");
        this.serviceName = service.name;
        this.serviceDesc = service.desc;
        this.servicePrice = service.price;
    

      });


    }

    console.log(this.editPage, this.route.snapshot.url, this.route.snapshot.params, this.route.snapshot.params['id']);
    this.myRef = this.af.database.object('/services/' + this.route.snapshot.params['id'])
  }



  ngOnInit() {
    this.serviceList = this.af.database.list('/services');
    this.serviceList.forEach(element => {
      console.log(element);

    });
    console.log('services', this.serviceList);
  }

 updateService(name: string, brand: string, price: string, image: string) {
      this.myRef.update({ name: this.serviceName, brand: this.serviceDesc, price: this.servicePrice });
      alert('Service Updated!');
      this.router.navigate(['/services']);
    }
  
  createService() {
    if (!(this.serviceName && this.serviceDesc && this.servicePrice)) {
      alert("all fields are required");
      return;
    }

    console.log('services', this.serviceName, this.serviceDesc, this.servicePrice);
    
    var ref = this.serviceList.push({ name: this.serviceName, desc: this.serviceDesc, price: this.servicePrice});
    this.router.navigate(['/services']);
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



