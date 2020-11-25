// built-in modules
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

// custom modules
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validatingForm: FormGroup;
  constructor( private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
 
  }
  
  // form validation
  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }
  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }
  
  //login request 
  loginUser(event){
    // event.preventDefault();
    console.log(event);
    const targetValue= event.target;
    const username= targetValue.querySelector('#emailInput').value;
    const password = targetValue.querySelector('#passwordInput').value;
    console.log(username, password);
    this.authService.userLoginDetail(username,password)
    .subscribe(res =>{
      console.log('server response:',res);
      if(res.success){
        if(username == 'hena'){
          this.router.navigate(['user/endUser']);
          this.authService.setLoggedIn(true);
        }
        if(username == 'agent'){
          this.router.navigate(['user/agent']);
          this.authService.setLoggedIn(true);
        }
        if(username == 'admin'){
          this.router.navigate(['user/admin']);
          this.authService.setLoggedIn(true);
        }
        if(username == 'company'){
          this.router.navigate(['user/company']);
          this.authService.setLoggedIn(true);
        }
        // else{
        //   this.router.navigate(['order']);
        //   this.authService.setLoggedIn(true);
        // }
      }
   });;
    
  }

}
