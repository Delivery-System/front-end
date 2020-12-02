
// built-in modules
import { Component, OnInit,ViewChild,ElementRef,ChangeDetectorRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {MDBModalRef, MDBModalService,MdbTableDirective, ModalDirective} from "angular-bootstrap-md";


// custom modules
import { AuthService } from 'src/app/services/auth.service';
import { RegistrationComponent } from '../registration/registration.component';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('row', { static: true }) row: ElementRef;
  @ViewChild('reset') public showModalOnClick: ModalDirective;

  modalRef: MDBModalRef;

  validatingForm: FormGroup;
  constructor( private authService:AuthService, private router:Router, private cdRef: ChangeDetectorRef,private modalService: MDBModalService) { }

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
  
    
  }
  openSignUpPage(){
    console.log('already have an account');
    console.log('signup page clicked');
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

}
