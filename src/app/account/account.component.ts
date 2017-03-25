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

  firstName: string = "";

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
        console.log('account user', user, this.firstName);
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
