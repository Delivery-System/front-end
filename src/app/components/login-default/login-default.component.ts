
// built-in modules
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService, MdbTableDirective, ModalDirective } from "angular-bootstrap-md";


// custom modules
import { AuthService } from 'src/app/services/auth.service';
import { RegistrationComponent } from '../registration/registration.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';


@Component({
  selector: 'app-login-default',
  templateUrl: './login-default.component.html',
  styleUrls: ['./login-default.component.scss']
})
export class LoginDefaultComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('row', { static: true }) row: ElementRef;
  @ViewChild('frame') public showModalOnClick: ModalDirective;

  modalRef: MDBModalRef;

  validatingForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private cdRef: ChangeDetectorRef, private modalService: MDBModalService) { }

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

  openSignUpPage() {
    console.log('signup page clicked');
    this.showModalOnClick.hide();
    // const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      backdrop: true, keyboard: true, focus: true, show: true,
      ignoreBackdropClick: false, animated: true, containerClass: 'overflow-auto',
      class: 'modal-md',
      data: {
        editableRow: ''
      }
    };
    this.showModalOnClick.hide();
    this.modalRef = this.modalService.show(RegistrationComponent, modalOptions);
  }

  // reset modal
  openResetPage() {
    console.log('reset page clicked');
    // const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOption = {
      backdrop: true, keyboard: true, focus: true, show: true,
      ignoreBackdropClick: false, animated: true, containerClass: 'overflow-auto',
      class: 'modal-md',
      data: {

      }
    };
    this.showModalOnClick.hide();
    this.modalRef = this.modalService.show(ResetPasswordComponent, modalOption);
  }
  //login request 
  loginUser(event) {
    // event.preventDefault();
    console.log(event);
    const targetValue = event.target;
    const email = targetValue.querySelector('#emailInput').value;
    const password = targetValue.querySelector('#passwordInput').value;
    const user = {
      email: email,
      password: password
    }
    console.log(email, password);
    this.authService.userLoginDetail(user)
      .subscribe(res => {
        console.log('server response:', res);
        if (res.success) {
          console.log('successfully logged in');
          console.log(res.user.account.role);
          if (res.user.account.role == 'end-user') {
            this.router.navigate(['user/endUser']);
            this.authService.setLoggedIn(true);
          }
          if (res.user.account.role == 'agent') {
            this.router.navigate(['user/agent']);
            this.authService.setLoggedIn(true);
          }

          if (res.user.account.role == 'admin') {
            console.log('redirect to admin');
            const loginAPIResult = null;
            if (res.user.account.role == 'admin') {
              const stringifiedToken = encodeURIComponent(JSON.stringify(res.token));
              console.log('token:', stringifiedToken);
              const path = 'http://localhost:4000/dashboard' + '?data=' + stringifiedToken;
              window.open(path);
              return;
            }
          }
         
        }
      });;

  }

}

  


