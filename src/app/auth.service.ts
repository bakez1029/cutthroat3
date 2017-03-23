import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2'

import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  uid: string = null;
  authUser: FirebaseAuthState;

  private user = new Subject();
  user$ = this.user.asObservable();


  constructor(public af: AngularFire) {

    this.af.auth.subscribe(auth => {
      if (auth) {
        console.log('service has auth[', auth, ']');
        this.authUser = auth;
        console.log('setting uid', this.uid);
        this.uid = auth.uid;
        this.user.next(this.uid);
      }
      else {
        this.uid = null;
      }
    });
  }

  login(username: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login({ email: username, password: password });
  }

  logout() {
    this.af.auth.logout();
    //this.uid = "not authenticated";
    //auth.auth.sendEmailVerification();
  }

  createNewUser(user: any) {
    this.af.auth.createUser({ email: user.email, password: user.password }).then((auth) => {
      // add extra profile infomation to authUser
      auth.auth.updateProfile({ displayName: user.first, photoURL: user.photoUrl });

      // create new user object ('/users/<key>' - not auth user as above) and add user properties
      var userObj = this.af.database.object('/users/' + auth.uid);
      userObj.set({
        uid: auth.uid,
        first: user.first,
        last: user.last
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  sendPasswordResetEmail(email: string) {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      console.log('email sent');
    }).catch(() => {
      console.log('error sending');
    });
  }

  getCurrentUser(): firebase.User {
    return firebase.auth().currentUser;
  }

}
