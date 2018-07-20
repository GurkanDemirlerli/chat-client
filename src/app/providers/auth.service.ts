import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { server } from '../../environments/environment';
import { ServicesHelpers } from './helpers';

@Injectable()
export class AuthService {

  private domain = server.url + "/";

  constructor(
    private http: Http
  ) {

  }

  public signup(user) {
    return this.http.post(this.domain + 'api/auth/signup', user).map(res => res.json());
  }

  public login(user) {
    return this.http.post(this.domain + 'api/auth/login', user).map(res => res.json());
  }

  public isAuthenticated() {
    let options = ServicesHelpers.createAuthenticationHeader();
    return this.http.get(this.domain + 'api/auth/isAuthenticated', options).map(res => res.json());
  }

  public controlUniquenessForEmail(email) {
    return this.http.get(this.domain + 'api/auth/controlUniquenessForEmail/' + email).map(res => res.json());
  }

  public getMyProfileCard() {
    let options = ServicesHelpers.createAuthenticationHeader();
    return this.http.get(this.domain + 'api/auth/getMyProfileCard', options).map(res => res.json());
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
  }

  public storeUserData(email, id, token) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('id', id);
  }

}
