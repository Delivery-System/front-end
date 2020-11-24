// built-in modules
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RecaptchaFormsModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { MdbTablePaginationComponent, MdbTableDirective  } from 'angular-bootstrap-md';

// custom module
import { OrderService } from 'src/app/services/order.service';
import { Item } from 'src/app/modals/item';
import { Status } from 'src/app/modals/status';
import { UserProfile } from 'src/app/modals/userProfile';
import { Role } from 'src/app/modals/role';

@Component({
  selector: 'app-edelivery',
  templateUrl: './edelivery.component.html',
  styleUrls: ['./edelivery.component.scss']
})
export class EdeliveryComponent implements OnInit, AfterViewInit {

  items: any[] = [
    { id: 1, name: 'Document ' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Cloth' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Groceries' }
  ]
  selected: number = 1;

  elementsOrder: any = [
    {id: 1, types: 'Furniture', quantity: 'one truck pack', time: 'ASAP'},
    {id: 2, types: 'Laundary', quantity: 'one basket', time: 'Tommorrow'},
    {id: 3, types: 'Groceries', quantity: 'one zembil', time: 'saturday morning'},
  ];
  elementsReorder: any = [
    {id: 1, types: 'Food', Schedule: ' every launch', time: '@12Am'},
    {id: 2, types: 'Laundary', Schedule: 'every saturday', time: '@12Am'},
    {id: 3, types: 'Groceries', Schedule: 'every saturday', time: '@12Am'},
  ];

  headElements = ['ID', 'Types', 'Schedule', 'Time'];
  headElement = ['ID', 'Types', 'auantity', 'Time'];
  profileStatus = true;
  orderStatus = false;
  reorderStatus = false;
  adrressStatus = false;
  paymentStatus = false;
  bonusStatus = false;

  constructor(private cdRef: ChangeDetectorRef, private recaptchaV3Service: ReCaptchaV3Service, private orderService:OrderService) { }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
  }

  getProfile() {
    console.log('profile clicked');
    this.profileStatus = true;
    this.orderStatus = false;
    this.reorderStatus = false;
    this.adrressStatus = false;
    this.paymentStatus = false;
    this.bonusStatus = false;
  }
  getOrder() {
    console.log('order clicked');
    this.profileStatus = false;
    this.orderStatus = true;
    this.reorderStatus = false;
    this.adrressStatus = false;
    this.paymentStatus = false;
    this.bonusStatus = false;
  }
  getReOrders() {
    console.log('order clicked');
    this.profileStatus = false;
    this.orderStatus = false;
    this.reorderStatus = true;
    this.adrressStatus = false;
    this.paymentStatus = false;
    this.bonusStatus = false;
  }
  getAddress() {
    console.log('address clicked');
    this.profileStatus = false;
    this.orderStatus = false;
    this.reorderStatus = false;
    this.adrressStatus = true;
    this.paymentStatus = false;
    this.bonusStatus = false;
  }
  getPayment() {
    console.log('payment clicked');
    this.profileStatus = false;
    this.orderStatus = false;
    this.reorderStatus = false;
    this.adrressStatus = false;
    this.paymentStatus = true;
    this.bonusStatus = false;
  }
  getBonus() {
    console.log('bonus clicked');
    this.profileStatus = false;
    this.orderStatus = false;
    this.reorderStatus = false;
    this.adrressStatus = false;
    this.paymentStatus = false;
    this.bonusStatus = true;
  }

  
  // get selected role
  selectOption(id: number) {
    console.log(id);
    console.log(this.selected)
  }

  // mock data 
  item:Item={
      'name':'sofa',
      'category':'furniture',
      'weightRange':'700Kg',
      'quantity':1
  }

  orderer:UserProfile={
    'role':Role.EndUser,
    'firstName':'',
    'lastName':'',
    'username':'',
    'email':'',
    'password':'',
    'address':'',
    'phoneNumber':'',
  }
  receiver:UserProfile={
    'role':Role.EndUser,
    'firstName':'',
    'lastName':'',
    'username':'',
    'email':'',
    'password':'',
    'address':'',
    'phoneNumber':'',
  }
  Assignee:UserProfile={
    'role':Role.EndUser,
    'firstName':'',
    'lastName':'',
    'username':'',
    'email':'',
    'password':'',
    'address':'',
    'phoneNumber':'',
  }
 status= Status.PENDING;
  sourceAdd='piasa';
  destAdd='bole';
  deliveryDate=new  Date();
  // order delivery
  orderDelivery(event){
    console.log('add to  clicked');
    const targetValue= event.target;
    this.orderService.orderDeliveryDetail(this.item,this.sourceAdd,this.destAdd,this.deliveryDate,this.status,this.orderer,this.receiver,this.Assignee).subscribe((res)=>{
        console.log('order succeded');
    })
  }


}