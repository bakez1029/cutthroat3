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

  user: any = { first: 'poo' };

  address: any;

  items: FirebaseListObservable<any>;

  items2: FirebaseListObservable<any>;
  showPasswordPanel: boolean = false;

  firstName: string = "randy";

  constructor(private authService: AuthService, public af: AngularFire, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.authService.user$.subscribe((uid: string) => {
      console.log("User updated!");
      this.af.database.object('/users/' + uid).subscribe((user: any) => {
        this.user = user;
        this.firstName = user.first;
        console.log('account user', user, this.firstName);
        this.cd.markForCheck();
      });
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
