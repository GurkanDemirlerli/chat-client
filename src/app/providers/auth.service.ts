import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Socket } from 'ng-socket-io';

@Injectable()
export class AuthService {

  // domain = ""; // Production
  domain = "http://localhost:1923/";
  authToken;
  user;
  options;

  constructor(
    private http: Http,
    private socket: Socket
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });
  }

  // Function to get token from client local storage
  loadToken() {
    this.authToken = localStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
  }

  // Function to register user accounts
  registerUser(user) {
    return this.http.post(this.domain + 'api/users/signup', user).map(res => res.json());
  }

  // Function to check if username is taken
  checkUsername(username) {
    return this.http.get(this.domain + 'authentication/checkUsername/' + username).map(res => res.json());
  }

  // Function to check if e-mail is taken
  checkEmail(email) {
    return this.http.get(this.domain + 'authentication/checkEmail/' + email).map(res => res.json());
  }

  // Function to login user
  login(user) {
    return this.http.post(this.domain + 'api/users/login', user).map(res => res.json());
  }

  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
  }

  // Function to store user's data in client local storage
  storeUserData(email, id, token) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('email', email); // Set user in local storage as string
    localStorage.setItem('id', id); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    // this.user = user; // Set user to be used elsewhere
  }

  // Function to get user's profile data
  getProfile() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'authentication/profile', this.options).map(res => res.json());
  }

  // Function to get public profile data
  getPublicProfile(username) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'authentication/publicProfile/' + username, this.options).map(res => res.json());
  }

  // Function to check if user is logged in
  loggedIn() {
    return tokenNotExpired();
  }

  changeNotificationId(userId, notificationId) {
    return this.http.post(this.domain + 'api/users/changeNotificationId', { userId: userId, notificationId: notificationId }).map(res => res.json());
  }

  deleteNotificationId(userId) {
    console.log(userId);
    return this.http.post(this.domain + 'api/users/deleteNotificationId', { userId: userId }).map(res => res.json());
  }

  getMyProfileCard() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'api/users/getMyProfileCard', this.options).map(res => res.json());
  }

}
