// built-in modules
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RecaptchaFormsModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { MdbTablePaginationComponent, MdbTableDirective  } from 'angular-bootstrap-md';

// custom module
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-agent-delivery',
  templateUrl: './agent-delivery.component.html',
  styleUrls: ['./agent-delivery.component.scss']
})
export class AgentDeliveryComponent implements OnInit ,AfterViewInit {

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

  masterHeadElements = ['Order Id', 'Order Date', 'Adress'];

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


}
