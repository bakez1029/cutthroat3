import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service'
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  ref: FirebaseListObservable<any>;;
  user: any;

  address: any;

  users: FirebaseListObservable<any>;

  items2: FirebaseListObservable<any>;
  showPasswordPanel: boolean = false;

  showEnabledFields: boolean = false;

  showDisabledFields: boolean = true;

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
      console.log(this.items2, " - THIS ITEMS2")

    });


  }

  sendPasswordEmail() {
    this.authService.sendPasswordResetEmail(this.authService.getCurrentUser().email);
    alert('A E-mail has been sent to change your password.');
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
  updateItem(key: string, newText: string, newText2: string, newText3: string, newText4: string, newText5: string) {
    this.items2.update(key, { street2: newText, street: newText2, city: newText3, state: newText4, postcode: newText5 });
  }
  deleteItem(key: string) {
    this.items2.remove(key);
  }



}
