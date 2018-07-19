import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';
import { ServicesHelpers } from './helpers';

@Injectable()
export class AuthService {

  domain = server.url + "/";
  
  constructor(
    private http: Http,
    private socket: Socket
  ) {

  }

  signup(user) {
    return this.http.post(this.domain + 'api/auth/signup', user).map(res => res.json());
  }

  login(user) {
    return this.http.post(this.domain + 'api/auth/login', user).map(res => res.json());
  }

  isAuthenticated() {
    let options = ServicesHelpers.createAuthenticationHeader();
    return this.http.get(this.domain + 'api/auth/isAuthenticated', options).map(res => res.json());
  }

  controlUniquenessForEmail(email) {
    return this.http.get(this.domain + 'api/auth/controlUniquenessForEmail/' + email).map(res => res.json());
  }

  getMyProfileCard() {
    let options = ServicesHelpers.createAuthenticationHeader();
    return this.http.get(this.domain + 'api/users/getMyProfileCard', options).map(res => res.json());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
  }

  storeUserData(email, id, token) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('id', id);
  }

}
