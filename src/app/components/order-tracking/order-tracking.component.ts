// built-in
import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MDBModalRef, ModalDirective } from 'angular-bootstrap-md';
import * as moment from 'moment';
import { Status } from 'src/app/modals/status';
import { OrderService } from 'src/app/services/order.service';

// custom 

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {

  @ViewChild('row', { static: true }) row: ElementRef;
  @ViewChild('delay') public showDelayModalOnClick: ModalDirective;
  @ViewChild('cancel') public showCancelModalOnClick: ModalDirective;
  @ViewChild('delayalert', { static: true }) alert: ElementRef;
  @ViewChild('cancelalert', { static: true }) alertcancel: ElementRef;


  modalRef: MDBModalRef;

  @Input() orderDetail;
  orderDetailDis = false;
  date:Date;
  gmtDate;
  delayRequest = false;
  cancleRequest= false;
  message:string;
  delayedOrderName:string;
  canceledOrderName:any;
  cancellationReason:string='';
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
  }

  // events: string[] = [];

  setToDate(newdate: any) {
    // this.events.push(`${event.value}`);
    const _ = moment();
    const date = moment(newdate).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()});
    this.date = date.toDate();
    this.gmtDate = new DatePipe('en-Us').transform(date, 'full', '+530');
  }
  onOpened(event: any) {
    console.log(event);
  }

  // close alert
  closeAlert(num) {
    if(num == 1){
      this.alert.nativeElement.classList.remove('show');
    }
    if(num == 2){
      this.alertcancel.nativeElement.classList.remove('show');
    }
   
  } 
  // date picker
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  // display detail
  OrderDetailDisplay() {
    console.log('delay order clicked');
    this.orderDetailDis = true;
  }

  // delay order modal
  DelayOrderModal() {
    console.log('delay order clicked');
    this.showDelayModalOnClick.show();
  }
  // delay order
  DelayOrder(order) {
    let data = [
      {
        "propName": "deliveryDate", "value": this.date
      }
    ];
    console.log('delay order clicked', order);
    console.log('delay order', this.date,this.gmtDate);
    this.orderService.updateUserOrder(order._id,data).subscribe((data: any)=>{
      console.log('delay response', data);
      if (data.success) {
        this.message=data.message;
        this.alert.nativeElement.classList.add('show');
        this.delayedOrderName= data.order.item.name;
        console.log('delayed order', this.delayedOrderName);
        this.showDelayModalOnClick.hide();
        this.delayRequest=true;
        order.deliveryDate = this.date;
      } else {
        alert(data.message)
      }
    });
  }
  // cancel order modal
  cancelOrderModal() {
    console.log('delay order clicked');
    this.showCancelModalOnClick.show();
  
  }
  // cancel order
  cancelOrder(order) {
    console.log('cancel order clicked');
    let data = [
      {
        "propName": "status", "value": Status.CANCELLED
      },
      {
        "propName": "cancellationReason", "value": this.cancellationReason
      },
      {
        "propName": "cancellationFee", "value": 0.0
      }
    ];
    this.orderService.cancelOrderedDelivery(order._id,data).subscribe((data)=>{
      console.log('delay response', data);
      if (data.success) {
        order.status = Status.CANCELLED;
        this.alert.nativeElement.classList.add('show');
        // this.canceledOrderName= data.order.item.name;
        console.log('cancled order', this.canceledOrderName);
        this.showCancelModalOnClick.hide();
        this.cancleRequest=true;
        // this.cancelClicked = false;
      } else {
        alert(data.message)
      }
    });
  }

}
