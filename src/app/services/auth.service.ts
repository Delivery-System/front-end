// built-in modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

// custom module
import { UserLogin } from '../modals/userLogin';
import { UserRegister } from '../modals/userRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;
  constructor(private http:HttpClient) { }

  // post the login info to api server
  // http://localhost:3000/users/login lidu local server
  // https://et-delivery-system.herokuapp.com/  server on heroku
  userLoginDetail(username, password): Observable<UserLogin> {
     return this.http.post<UserLogin>('http://localhost:3000/agents/login',{
       username,
       password
     });
  }

  // post the login info to api server
  userRegisterDetail(firstName,lastName,userName,phoneNumber,email,selected,password,confirmPassword):Observable<UserRegister>{
    return this.http.post<UserRegister>('http://localhost:3000/agents/register',{
      firstName,
      lastName,
      userName,
      phoneNumber,
      email,
      selected,
      password,
      confirmPassword
    });

  }
  setLoggedIn(status: boolean){
    this.loggedInStatus= status;
  }

  get isLoggedIn(){
    return this.loggedInStatus;
  }
}
