import { Component, OnInit, EventEmitter } from '@angular/core';
import { UploadComponent } from '../upload.component';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from './user.interface';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  states: string[];
  form: any;
  submitted: boolean = false;
  forms: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {

    this.forms = af.database.list('/forms');

  }

  public user: User

  ngOnInit() {
    this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    this.user = {
      name: '',
      phone: '',
      email: '',
      address: {
        street: '',
        city: '',
        state: '',
        postcode: '', // set default value to 8000
      }

    };
  }

  onSubmit(form: any) {
    console.log(this.user);
    
    this.forms.push(this.user);
    // this.router.navigate(['/']),
    alert("Your information was submitted.");

  }



}
