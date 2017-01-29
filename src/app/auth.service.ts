import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2'

@Injectable()
export class AuthService {

  uid: string = 'not authenticated';

  constructor(public af: AngularFire) {

    this.af.auth.subscribe(auth => {
      if (auth) {
        console.log('service has auth', auth);
        this.uid = auth.uid;
      }
    });

  }

  login(username: string, password: string): any {
    return this.af.auth.login({ email: username, password: password });
  }

  logout() {
    this.af.auth.logout();
    this.uid = "not authenticated";
  }

}
