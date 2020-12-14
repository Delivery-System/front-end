// built-in modules
import { Component, OnInit,ElementRef,ChangeDetectorRef,ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {MDBModalRef, MDBModalService,MdbTableDirective, ModalDirective} from "angular-bootstrap-md";


// custom modules
import { AuthService } from 'src/app/services/auth.service';
import { LoginDefaultComponent } from '../login-default/login-default.component';
import { MyTel } from 'src/app/modals/myTel';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('row', { static: true }) row: ElementRef;
  // @ViewChild('register') public showModalOnClick: ModalDirective;

  modalRef: MDBModalRef;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // isOptional = false;

  fileToUpload: File = null;
  firstName;lastName;userName;email;phoneNumber;role;password;confirmPassword;
  form: FormGroup = new FormGroup({
    tel: new FormControl(new MyTel('', '', ''))
  });

  selectedRole = 'end-user';
  phoneNo="092909943";
  items: any[] = [
    { id: 1, name: 'User' },
    { id: 2, name: 'Dasher' },
    { id: 3, name: 'Business' }
  ]
  selectedFiles: any;
 
  constructor(private _formBuilder: FormBuilder,private authService:AuthService, private router:Router,private cdRef: ChangeDetectorRef,private modalService: MDBModalService) {
   }

  validatingForm: FormGroup;

  ngOnInit():void {
  
    this.validatingForm = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
  }

  // for phone imput
  
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
    // console.log(this.selected)
  }
  registerUserDetail(event){
    console.log('register button clicked');
    const targetValue=event.target;
     this.firstName=targetValue.querySelector('#firstName').value;
    console.log(this.firstName);
    this.lastName=targetValue.querySelector('#lastName').value;
    this.userName=targetValue.querySelector('#userName').value;
    // const phoneNumber= targetValue.querySelector('#phoneNumber').value;
    this. email= targetValue.querySelector('#email').value;
    this.password=targetValue.querySelector('#password').value;
    this.confirmPassword=targetValue.querySelector('#confirmPassword').value;
    console.log(this.selectedRole);
    console.log(this.firstName,this.lastName,this.userName, this.phoneNo,this.email,this.selectedRole,this.password, this.confirmPassword);
   
  }

  // register
  registerUser(event){
    const user = {
      firstName:this.firstName,
      lastName:this.lastName,
      username:this.userName,
      email:this.email,
      phoneNumber:this.phoneNo,
      role:this.selectedRole,
      password:this.password
    }
    if(this.password !== this.confirmPassword ){
      alert('password not matched');
    }
    else{
      console.log('ready to login');
      if(this.selectedRole == 'end-user'){
        this.authService.userRegisterDetail(user)
        .subscribe((res)=>{
            if(res.success){
               console.log(res);
              // this.router.navigate(['login']);
  
            }
        });
      }
      if(this.selectedRole == 'agent'){
        this.authService.agentRegisterDetail(this.firstName,this.lastName,this.userName,this.phoneNo,this.email,this.selectedRole,this.password)
        .subscribe((res)=>{
            if(res.success){
               console.log(res);
              // this.router.navigate(['login']);
  
            }
        });
      }
     
     
    }
  }
  // launch to login modal page
  openLoginPage(){
    console.log('already have an account');
    console.log('signup page clicked');
    const modalOptions = {
      backdrop: true, keyboard: true, focus: true, show: true,
      ignoreBackdropClick: false, animated: true, containerClass: 'overflow-auto',
      class: 'modal-sm',
      data: {
        editableRow: ''
      }
    };
    
    // this.showModalOnClick.hide();
    this.modalRef = this.modalService.show(LoginDefaultComponent, modalOptions);
 
  }

  // upload file
  selectFile(event) {
    this.selectedFiles = event.target.files;
}
}
