import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, public af: AngularFire, private router: Router) {

  
  
   }

  ngOnInit() {
    console.log('account uid', this.authService.uid);
    this.items = this.af.database.list('/users/' + this.authService.uid);

//     this.items = this.af.database.list('/users/' + this.authService.uid, { preserveSnapshot: true });
// this.items
//   .subscribe(snapshots => {
//     snapshots.forEach(snapshot => {
//       console.log(snapshot.key)
//       console.log(snapshot.val())
//     });
//   })

    //  this.items2 = this.af.database.list('/users/' + this.authService.uid + '/address');

    //  this.user = this.af.database.object('/users/' + this.authService.uid);
    //  this.address = this.af.database.object('/users/' + this.authService.uid + '/address/');
    // console.log('user', this.user, this.authService.authUser);
    
    
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
