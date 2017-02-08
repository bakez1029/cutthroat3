import { Component, Inject, OnInit } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  image: string = "";

  constructor(@Inject(FirebaseApp) firebaseApp: firebase.app.App) {
    const storageRef = firebaseApp.storage().ref().child('product/images/logo.png');
    storageRef.getDownloadURL().then(url => this.image = url);
  }

  ngOnInit() {

  }

}
