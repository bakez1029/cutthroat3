import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  orders: any;
  orderStatus: FirebaseListObservable<any[]>;
  pending: boolean = false;
  shipped: boolean = false;
  cancelled: boolean = false;
  constructor(public af: AngularFire) { }

  ngOnInit() {


    this.orders = this.af.database.list('/orders');
    console.log('Forms', this.orders);


  }
ifPending(key: string) {
    this.orderStatus = this.af.database.list('/orders');
    this.orderStatus.update(key, { status: "Pending" });
  
  }


  ifShipped(key: string) {
    this.orderStatus = this.af.database.list('/orders');
    this.orderStatus.update(key, { status: "Shipped" });

  }

  ifCancelled(key: string) {
    this.orderStatus = this.af.database.list('/orders');
    this.orderStatus.update(key, { status: "Cancelled" });

  }

}
