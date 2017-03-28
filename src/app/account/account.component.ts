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

  user: any;

  address: any;

  items: FirebaseListObservable<any>;

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

  constructor(private authService: AuthService, public af: AngularFire, private router: Router, private cd: ChangeDetectorRef) { }

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
    this.items.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.items.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.items.remove(key);
  }
  deleteEverything() {
    this.items.remove();
  }



}
