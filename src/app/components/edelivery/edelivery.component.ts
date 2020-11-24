// built-in modules
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RecaptchaFormsModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { MdbTablePaginationComponent, MdbTableDirective  } from 'angular-bootstrap-md';

@Component({
  selector: 'app-edelivery',
  templateUrl: './edelivery.component.html',
  styleUrls: ['./edelivery.component.scss']
})
export class EdeliveryComponent implements OnInit, AfterViewInit {

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

  constructor(private cdRef: ChangeDetectorRef, private recaptchaV3Service: ReCaptchaV3Service) { }
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
