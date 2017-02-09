import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.component.html',
  styleUrls: ['./barbers.component.css']
})
export class BarbersComponent implements OnInit {
    barberList: FirebaseListObservable<any[]>;

   constructor(public af: AngularFire) { }

  ngOnInit() {
    this.barberList = this.af.database.list('/barbers');
    console.log('filelist', this.barberList);
    
  }


}
