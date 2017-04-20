import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service'
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

   months = [
    {value: '1-0', viewValue: '1'},
    {value: '2-1', viewValue: '2'},
    {value: '3-2', viewValue: '3'},
    {value: '4-3', viewValue: '4'},
    {value: '5-4', viewValue: '5'},
    {value: '6-5', viewValue: '6'},
    {value: '7-6', viewValue: '7'},
    {value: '8-7', viewValue: '8'},
    {value: '9-8', viewValue: '9'},
    {value: '10-9', viewValue: '10'},
    {value: '11-10', viewValue: '11'},
    {value: '12-11', viewValue: '12'}
  ];

  years = [
    {value: '2017-0', viewValue: '2017'},
    {value: '2018-1', viewValue: '2018'},
    {value: '2019-2', viewValue: '2019'},
    {value: '2020-3', viewValue: '2020'},
    {value: '2021-4', viewValue: '2021'},
    {value: '2022-5', viewValue: '2022'},
    {value: '2023-6', viewValue: '2023'},
    {value: '2024-7', viewValue: '2024'},
    {value: '2025-8', viewValue: '2025'},
    {value: '2026-9', viewValue: '2026'},
    {value: '2027-10', viewValue: '2027'},
    {value: '2028-11', viewValue: '2028'},
    {value: '2029-12', viewValue: '2029'},
    {value: '2030-13', viewValue: '2030'},
    {value: '2031-14', viewValue: '2031'},
    {value: '2032-15', viewValue: '2032'},
    {value: '2033-16', viewValue: '2033'},
    {value: '2034-17', viewValue: '2034'},
    {value: '2035-18', viewValue: '2035'},
    {value: '2036-19', viewValue: '2036'}
  ];

  ref: FirebaseListObservable<any>;;
  user: any;

  uid1: any;
  address: any;
  items: FirebaseListObservable<any>;

  items2: FirebaseListObservable<any>;
  showPasswordPanel: boolean = false;

  showEnabledFields: boolean = false;

  showDisabledFields: boolean = true;

  password: any;

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  phone: string = "";
  street: string = "";
  street2: string = "";
  city: string = "";
  state: string = "";
  postcode: string = "";

  constructor(private authService: AuthService, public af: AngularFire, private router: Router, private cd: ChangeDetectorRef) {

    this.items2 = this.ref
  }

  ngOnInit() {
  


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
      this.firstName = user.first;
      this.lastName = user.last;
      this.email = user.email;
      this.phone = user.phone;
      console.log('account user', user, this.firstName);
      this.cd.markForCheck();

      this.items = this.af.database.list('/users/')
    });
    this.af.database.object('/users/' + uid + '/address/').subscribe((address: any) => {
      this.address = address;
      this.street = address.street;
      this.street2 = address.street2;
      this.city = address.city;
      this.state = address.state;
      this.postcode = address.postcode;
      this.cd.markForCheck();

      this.items2 = this.af.database.list('/users/' + uid)



    });


  }

updatePassword(newPassword: string) {
var user = this.authService.getCurrentUser() 
user.updatePassword(newPassword)
}



  onChangePassword() {
    this.showPasswordPanel = true;
  }
  onChange() {
    this.showPasswordPanel = false;
  }

  onEdit() {
    this.showEnabledFields = true;
    this.showDisabledFields = false;
  }

  onSave() {
    this.showEnabledFields = false;
    this.showDisabledFields = true;
  }

  addItem(newName: string) {
    this.items2.push({ street2: newName });
  }
  updateItem2(key: string, newText: string, newText2: string, newText3: string, newText4: string, newText5: string) {
    if (newText != "") {
      this.items2.update(key, { street2: newText})
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText2 != "") {
      this.items2.update(key, { street: newText2})
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText3 != "") {
      this.items2.update(key, { city: newText3})
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText4 != "") {
      this.items2.update(key, { state: newText4})
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText5 != "") {
      this.items2.update(key, { postcode: newText5})
    } else {
      console.log("No changes have been submitted.")
    }
  }

  updateItem(key: string, newText: string, newText2: string, newText3: string, newText4: string) {
   if (newText != "") {
      this.items.update(key, { first: newText})
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText2 != "") {
      this.items.update(key, { last: newText2})
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText3 != "") {
      this.items.update(key, { email: newText3})
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText4 != "") {
      this.items.update(key, { phone: newText4})
    } else {
      console.log("No changes have been submitted.")
    
    }

  } deleteItem(key: string) {
    this.items2.remove(key);
  }



}
