import { Component, OnInit, ChangeDetectorRef, Renderer } from '@angular/core';
import { AuthService } from '../auth.service'
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router'
import * as firebase from 'firebase';
declare var Stripe: any

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  taxRate = 0.0675;
  shipRate = 6.95;

  globalListener: any;

  status: "Pending";
  name: string;
  length: any;
  cartItems: any = [];
  allCartItems: any;

  orderNumber = 1000;

  months = [
    { value: '1-0', viewValue: '1' },
    { value: '2-1', viewValue: '2' },
    { value: '3-2', viewValue: '3' },
    { value: '4-3', viewValue: '4' },
    { value: '5-4', viewValue: '5' },
    { value: '6-5', viewValue: '6' },
    { value: '7-6', viewValue: '7' },
    { value: '8-7', viewValue: '8' },
    { value: '9-8', viewValue: '9' },
    { value: '10-9', viewValue: '10' },
    { value: '11-10', viewValue: '11' },
    { value: '12-11', viewValue: '12' }
  ];

  years = [
    { value: '2017-0', viewValue: '2017' },
    { value: '2018-1', viewValue: '2018' },
    { value: '2019-2', viewValue: '2019' },
    { value: '2020-3', viewValue: '2020' },
    { value: '2021-4', viewValue: '2021' },
    { value: '2022-5', viewValue: '2022' },
    { value: '2023-6', viewValue: '2023' },
    { value: '2024-7', viewValue: '2024' },
    { value: '2025-8', viewValue: '2025' },
    { value: '2026-9', viewValue: '2026' },
    { value: '2027-10', viewValue: '2027' },
    { value: '2028-11', viewValue: '2028' },
    { value: '2029-12', viewValue: '2029' },
    { value: '2030-13', viewValue: '2030' },
    { value: '2031-14', viewValue: '2031' },
    { value: '2032-15', viewValue: '2032' },
    { value: '2033-16', viewValue: '2033' },
    { value: '2034-17', viewValue: '2034' },
    { value: '2035-18', viewValue: '2035' },
    { value: '2036-19', viewValue: '2036' }
  ];

  ref: FirebaseListObservable<any>;;
  user: any;

  uid1: any;
  address: any;
  items: FirebaseListObservable<any>;

  items2: FirebaseListObservable<any>;
  showPasswordPanel: boolean = false;

  showEnabledFields: boolean = false;

  showDisabledFields: boolean = true;

  password: any;

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  phone: string = "";
  street: string = "";
  street2: string = "";
  city: string = "";
  state: string = "";
  postcode: string = "";
  mine: any;

  mine2: any;
  order: any;
  subTotal = 0;
  value = 0;
  shipping = 0;
  tax = 0;
  grandTotal = 0;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  ordersId: any;
  private cardToken: any;

  constructor(private authService: AuthService, public af: AngularFire, private router: Router, private cd: ChangeDetectorRef, private renderer: Renderer) {

  }

  ngOnInit() {

    this.af.database.list('/orders').subscribe((orders: any) => {
      console.log('orders', orders, orders.length);

      this.orderNumber = 1000 + orders.length;
      console.log('order number', this.orderNumber);
    });

    // Create a Stripe client
    var stripe = Stripe('pk_live_0C53WDD9YGcPWGpdNgDRr1YW');

    // Create an instance of Elements
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element
    var card = elements.create('card', { style: style });

    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function (event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Handle form submission
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      stripe.createToken(card).then(function (result) {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server
          stripeTokenHandler(result.token);
        }
      });
    });





    var stripeTokenHandler = (token) => {
      // Insert the token ID into the form so it gets submitted to the server
      var form = document.getElementById('payment-form');
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);


      console.log('trans id', token.id);
      this.onSubmit(token.id);


      // Charge the user's card:
      var charge = stripe.charges.create({
        amount: 1000,
        currency: "usd",
        description: "Example charge",
        source: token.id,
      }, function (err, charge) {
        // asynchronously called
      });
    }



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
      this.mine = this.af.database.list('/users/' + uid + '/cart')
      this.mine2 = this.af.database.list('/users/' + uid + '/cart/orders')
      this.computeCart();
      this.order = this.af.database.list('/orders')
      this.user = user;
      this.firstName = user.first;
      this.lastName = user.last;
      this.email = user.email;
      this.phone = user.phone;
      console.log('account user', user, this.firstName);
      this.cd.markForCheck();

      this.items = this.af.database.list('/users/')
    });
    this.af.database.object('/users/' + uid + '/address/').subscribe((address: any) => {
      this.street = address.street;
      this.street2 = address.street2;
      this.city = address.city;
      this.state = address.state;
      this.postcode = address.postcode;
      this.user.address = address.street + " " + address.street2 + " " + address.city + " " + address.state + " " + address.postcode;
      this.cd.markForCheck();
      this.items2 = this.af.database.list('/users/' + uid)
    });
  }

  updatePassword(newPassword: string) {
    var user = this.authService.getCurrentUser()
    user.updatePassword(newPassword)
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
    this.items2.push({ street2: newName });
  }
  updateItem2(key: string, newText: string, newText2: string, newText3: string, newText4: string, newText5: string) {
    if (newText != "") {
      this.items2.update(key, { street2: newText })
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText2 != "") {
      this.items2.update(key, { street: newText2 })
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText3 != "") {
      this.items2.update(key, { city: newText3 })
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText4 != "") {
      this.items2.update(key, { state: newText4 })
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText5 != "") {
      this.items2.update(key, { postcode: newText5 })
    } else {
      console.log("No changes have been submitted.")
    }
  }

  updateItem(key: string, newText: string, newText2: string, newText3: string, newText4: string) {
    if (newText != "") {
      this.items.update(key, { first: newText })
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText2 != "") {
      this.items.update(key, { last: newText2 })
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText3 != "") {
      this.items.update(key, { email: newText3 })
    } else {
      console.log("No changes have been submitted.")
    }
    if (newText4 != "") {
      this.items.update(key, { phone: newText4 })
    } else {
      console.log("No changes have been submitted.")

    }

  } deleteItem(key: string) {
    this.items2.remove(key);
  }

  removeItem(key: string) {
    console.log('key', key);
    this.mine.remove(key);
    this.computeCart();
  }

  computeCart() {
    console.log("IS IT BEING CALLED", this.mine);
    var subtotal = 0;

    this.mine.subscribe(cart => {
      for (let item of cart) {
        subtotal += parseInt(item.price)
        this.cartItems.push({ brand: item.brand, name: item.name, price: item.price });
      }

      console.log(subtotal);
      this.subTotal = subtotal;
      this.shipping = this.shipRate;
      this.tax = subtotal * this.taxRate;
      this.grandTotal = subtotal + this.shipping + this.tax;
      console.log(this.grandTotal, "grandtotal")
    });
  }

  onSubmit(transId) {

    alert("Your transaction was successful. A payment confirmation has been sent to your E-mail.");


    console.log('pooxxxxxxxxxxxxxx', this.cartItems);

    //pushes the order to database
    this.order.push(
      {
        orderNumber: this.orderNumber,
        transactionId: transId,
        userId: this.authService.uid,
        subTotal: this.subTotal,
        status: "Pending",
        total: this.grandTotal,
        cartItems: this.cartItems,
        address: this.user.address,
        date: Date(),
      });

    this.mine.remove(); //clears the cart

    setTimeout((router: Router) => {
      this.router.navigate(['/home']);
    }, 1000);  // Waits 5 seconds and then returns user to the homepage.
  }


}











