import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

 photoList: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire) { }

  ngOnInit() {
    this.photoList = this.af.database.list('/photo');
    console.log('filelist', this.photoList);
  }

}
