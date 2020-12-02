// built-in modules
import { Component, OnInit,ElementRef,ChangeDetectorRef,ViewChild} from '@angular/core';
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
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('row', { static: true }) row: ElementRef;
  // @ViewChild('register') public showModalOnClick: ModalDirective;

  modalRef: MDBModalRef;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // isOptional = false;

  form: FormGroup = new FormGroup({
    tel: new FormControl(new MyTel('', '', ''))
  });

  selectedRole = 'agent';
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
  registerUser(event){
    console.log('register button clicked');
    const targetValue=event.target;
    const firstName=targetValue.querySelector('#firstName').value;
    console.log(firstName);
    const lastName=targetValue.querySelector('#lastName').value;
    const userName=targetValue.querySelector('#userName').value;
    // const phoneNumber= targetValue.querySelector('#phoneNumber').value;
    const email= targetValue.querySelector('#email').value;
    const password=targetValue.querySelector('#password').value;
    const confirmPassword=targetValue.querySelector('#confirmPassword').value;
    console.log(this.selectedRole);
    console.log(firstName,lastName,userName, this.phoneNo,email,this.selectedRole,password, confirmPassword);
    if(password !== confirmPassword ){
      alert('password not matched');
    }
    else{
      console.log('ready to login');
      this.authService.agentRegisterDetail(firstName,lastName,userName,this.phoneNo,email,this.selectedRole,password)
      .subscribe((res)=>{
          if(res.success){
             console.log(res);
            // this.router.navigate(['login']);

          }
      });
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
