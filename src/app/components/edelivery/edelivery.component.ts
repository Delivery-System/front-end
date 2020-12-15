// built-in modules
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RecaptchaFormsModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

// custom module
import { OrderService } from 'src/app/services/order.service';
import { Item } from 'src/app/modals/item';
import { Status } from 'src/app/modals/status';
import { UserProfile } from 'src/app/modals/userProfile';
import { Role } from 'src/app/modals/role';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edelivery',
  templateUrl: './edelivery.component.html',
  styleUrls: ['./edelivery.component.scss']
})
export class EdeliveryComponent implements OnInit, AfterViewInit {
  validatingForm: FormGroup;
  orderMyRequest: any = [];
  items: any[] = [
    { id: 1, name: 'Document ' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Cloth' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Groceries' }
  ]
  selected: number = 1;

  elementsOrder: any = [
    { id: 1, types: 'Furniture', quantity: 'one truck pack', time: 'ASAP' },
    { id: 2, types: 'Laundary', quantity: 'one basket', time: 'Tommorrow' },
    { id: 3, types: 'Groceries', quantity: 'one zembil', time: 'saturday morning' },
  ];
  elementsReorder: any = [
    { id: 1, types: 'Food', Schedule: ' every launch', time: '@12Am' },
    { id: 2, types: 'Laundary', Schedule: 'every saturday', time: '@12Am' },
    { id: 3, types: 'Groceries', Schedule: 'every saturday', time: '@12Am' },
  ];

  elements: any = [
    {
      id: 1,
      first: 'Mark',
      last: 'Otto',
      handle: '@mdo',
      collapsed: true,
      masterDetail: [{ orderId: 1, orderDate: '24-07-1996', adress: '35 King George' }],
    },
    {
      id: 2,
      first: 'Jacob',
      last: 'Thornton',
      handle: '@fat',
      collapsed: false,
      masterDetail: [{ orderId: 2, orderDate: '04-01-1992', adress: 'Obere Str. 57' }],
    },
    {
      id: 3,
      first: 'Larry',
      last: 'the Bird',
      handle: '@twitter',
      collapsed: false,
      masterDetail: [{ orderId: 3, orderDate: '15-01-1994', adress: 'Kirchgasse 6' }],
    },

  ];

  headElements = ['ID', 'First', 'Last', 'Handle'];
  masterHeadElements = ['Order Id', 'Order Date', 'Adress'];

  // headElements = ['ID', 'Types', 'Schedule', 'Time'];
  headElement = ['ID', 'Types', 'auantity', 'Time'];
  profileStatus = true;
  orderStatus = false;
  reorderStatus = false;
  adrressStatus = false;
  paymentStatus = false;
  bonusStatus = false;
  trackingStatus = false;

  orderDetail = [];
  addTracking(newItem: string){
    this.profileStatus = false;
    this.orderStatus = false;
    this.reorderStatus = false;
    this.adrressStatus = false;
    this.paymentStatus = false;
    this.bonusStatus = false;
    this.trackingStatus=true;
    this.orderDetail.push(newItem);
  }

  constructor(private cdRef: ChangeDetectorRef, private recaptchaV3Service: ReCaptchaV3Service, private orderService: OrderService, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      modalFormAvatarPassword: new FormControl('', Validators.required)
    });

    console.log('orderDetail',this.orderDetail);
  }
  ngAfterViewInit() {
  }

  get modalFormAvatarPassword() {
    return this.validatingForm.get('modalFormAvatarPassword');
  }


  getProfile() {
    console.log('profile clicked');
    this.profileStatus = true;
    this.orderStatus = false;
    this.reorderStatus = false;
    this.adrressStatus = false;
    this.paymentStatus = false;
    this.bonusStatus = false;
    this.trackingStatus=false;
  }
  getOrder() {
    console.log('order clicked');
    this.profileStatus = false;
    this.orderStatus = true;
    this.reorderStatus = false;
    this.adrressStatus = false;
    this.paymentStatus = false;
    this.bonusStatus = false;
    this.trackingStatus=false;
  }
  getReOrders() {
    console.log('order clicked');
    this.profileStatus = false;
    this.orderStatus = false;
    this.reorderStatus = true;
    this.adrressStatus = false;
    this.paymentStatus = false;
    this.bonusStatus = false;
    this.trackingStatus=false;
  }
  getAddress() {
    console.log('address clicked');
    this.profileStatus = false;
    this.orderStatus = false;
    this.reorderStatus = false;
    this.adrressStatus = true;
    this.paymentStatus = false;
    this.bonusStatus = false;
    this.trackingStatus=false;
  }
  getPayment() {
    console.log('payment clicked');
    this.profileStatus = false;
    this.orderStatus = false;
    this.reorderStatus = false;
    this.adrressStatus = false;
    this.paymentStatus = true;
    this.bonusStatus = false;
    this.trackingStatus=false;
  }
  getBonus() {
    console.log('bonus clicked');
    this.profileStatus = false;
    this.orderStatus = false;
    this.reorderStatus = false;
    this.adrressStatus = false;
    this.paymentStatus = false;
    this.bonusStatus = true;
    this.trackingStatus=false;
  }


  // get selected role
  selectOption(id: number) {
    console.log(id);
    console.log(this.selected)
  }

  // mock data 
  item: Item = {
    'name': 'sofa',
    'category': 'furniture',
    'weightRange': '700Kg',
    'quantity': 1
  }

  orderer: UserProfile = {
    'role': Role.EndUser,
    'firstName': '',
    'lastName': '',
    'username': '',
    'email': '',
    'password': '',
    'address': '',
    'phoneNumber': '',
  }
  receiver: UserProfile = {
    'role': Role.EndUser,
    'firstName': '',
    'lastName': '',
    'username': '',
    'email': '',
    'password': '',
    'address': '',
    'phoneNumber': '',
  }
  Assignee: UserProfile = {
    'role': Role.EndUser,
    'firstName': '',
    'lastName': '',
    'username': '',
    'email': '',
    'password': '',
    'address': '',
    'phoneNumber': '',
  }
  status = Status.PENDING;
  sourceAdd = 'piasa';
  destAdd = 'bole';
  deliveryDate = new Date();
  // order delivery
  orderDelivery(event) {
    console.log('add to  clicked');
    const targetValue = event.target;
    this.orderService.orderDeliveryDetail(this.item, this.sourceAdd, this.destAdd, this.deliveryDate, this.status, this.orderer, this.receiver).subscribe((res) => {
      console.log('order succeded');
      console.log(res);
    })
  }

  getMyOrders() {
    console.log('get order');
    this.orderService.getOrder().subscribe((res) => {
      console.log('order succeded', res);
      this.orderMyRequest = res;
      console.log('requested order:', this.orderMyRequest);
    });
  }

  logout() {
    console.log('logout clicked');
    this.authService.logout();
    this.router.navigate(['/']);
    return false;
  }
}
