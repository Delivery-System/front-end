// built-in modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
// custom module
import { UserLogin } from '../modals/userLogin';
import { UserRegister } from '../modals/userRegister';
import { User } from '../modals/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject: BehaviorSubject<User>;
  user: Observable<User>;
  private loggedInStatus = false;
  authToken: any;

  // post the login info to api server
  // http://localhost:3000/users/login lidu local server
  // http://localhost:3000/api/userLogin
  // https://et-delivery-system.herokuapp.com/  server on heroku
  private API_URL = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {
    let userData = JSON.parse(localStorage.getItem('user'));
    this.userSubject = new BehaviorSubject<User>(userData);
    this.user = this.userSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.userSubject.value;
  }

  public get token(): any {
    return this.authToken;
  }

  // post the user info to api server
  userRegisterDetail(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<UserRegister>(' http://localhost:3000/users/register', user,{ headers: headers })
    .pipe(map(res => res));

  }

  // register(user) {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.httpClient
  //     .post(`${this.API_URL}/register`, user, { headers: headers })
  //     .pipe(map(res => res));
  // }

  // userLoginDetail(username, password): Observable<UserLogin> {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //    return this.httpClient.post<UserLogin>('http://localhost:3000/users/login',{
  //      username,
  //      password
  //    },{ headers: headers });
  // }

  userLoginDetail(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient
      .post<any>(`${this.API_URL}/login`, user, { headers: headers })
      .pipe(map(data => {
        if (data && data.token) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', JSON.stringify(data.token));
          this.userSubject.next(data.user);
          this.authToken = data.token;
        }
        return data;
      }));
  }

  loadToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    this.authToken = token;
  }

  loggedIn() {
    this.loadToken();
    if (this.authToken) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this.userSubject.next(null);
    this.authToken = null;
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.httpClient
      .get('http://localhost:3000/users/profile', { headers: headers })
      .pipe(map(res => res));
  }



  // post the agent info to api server
  agentRegisterDetail(firstName, lastName, username, phoneNumber, email, role, password): Observable<UserRegister> {
    return this.httpClient.post<UserRegister>(' http://localhost:3000/waitingAgents/register', {
      firstName,
      lastName,
      username,
      phoneNumber,
      email,
      role,
      password
    });

  }

  setLoggedIn(status: boolean) {
    this.loggedInStatus = status;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }
}
