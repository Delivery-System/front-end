// built-in modules
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

// custom modules
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  items: any[] = [
    { id: 1, name: 'User' },
    { id: 2, name: 'Dasher' },
    { id: 3, name: 'Business' }
  ]
  selected: number = 1;
  constructor(private authService:AuthService, private router:Router) {

   }

  validatingForm: FormGroup;

  ngOnInit():void {
  
    this.validatingForm = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
    });
  }

  get signupFormModalName() {
    return this.validatingForm.get('signupFormModalName');
  }

  get signupFormModalEmail() {
    return this.validatingForm.get('signupFormModalEmail');
  }

  get signupFormModalPassword() {
    return this.validatingForm.get('signupFormModalPassword');
  }

  // get selected role

  selectOption(id: number) {
    //getted from event
    console.log(id);
    //getted from binding
    console.log(this.selected)
  }
  registerUser(event){
    console.log('register button clicked');
    const targetValue=event.target;
    const fullname=targetValue.querySelector('#fulName').value;
    const phoneNumber= targetValue.querySelector('#phoneNumber').value;
    const email= targetValue.querySelector('#email').value;
    // const role= targetValue.querySelector('#role').text();
    const password=targetValue.querySelector('#passwod').value;
    const conPassword=targetValue.querySelector('#confirmPassword').value;
    console.log(fullname, phoneNumber,email,this.selected,password,conPassword);
    if(password !== conPassword ){
      alert('password not matched');
    }
    else{
      console.log('ready to login');
      this.authService.userRegisterDetail(fullname,phoneNumber,email,this.selected,password)
      .subscribe((res)=>{
          if(res.success){
            this.router.navigate(['login']);

          }
      });
    }
  }
}
