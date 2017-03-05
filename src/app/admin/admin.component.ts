import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  forms: any;

  constructor(public af: AngularFire) { }

  ngOnInit() {

    
      this.forms = this.af.database.object('/forms/');
      console.log('Forms', this.forms);
    

  }

}
