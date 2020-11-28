// built-in modules
import { Component, OnInit,ViewChild,ElementRef,ChangeDetectorRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {MDBModalRef, MDBModalService,MdbTableDirective, ModalDirective} from "angular-bootstrap-md";


// custom modules
import { AuthService } from 'src/app/services/auth.service';
import { RegistrationComponent } from '../registration/registration.component';
// RegistrationComponent

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('row', { static: true }) row: ElementRef;
  @ViewChild('frame') public showModalOnClick: ModalDirective;

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
  
  openSignUpPage() {
    console.log('signup page clicked');
    // const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: ''
      }
    };
   
    this.showModalOnClick.hide();
    this.modalRef = this.modalService.show(RegistrationComponent, modalOptions);
    // this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
    //   this.elements[elementIndex] = newElement;
    // });
    // this.mdbTable.setDataSource(this.elements);
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
