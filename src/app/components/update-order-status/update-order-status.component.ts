
// built-in
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MDBModalRef, ModalDirective } from 'angular-bootstrap-md';
import { OrderService } from 'src/app/services/order.service';

// custom 

@Component({
  selector: 'app-update-order-status',
  templateUrl: './update-order-status.component.html',
  styleUrls: ['./update-order-status.component.scss']
})
export class UpdateOrderStatusComponent implements OnInit {

  @ViewChild('row', { static: true }) row: ElementRef;
  @ViewChild('delay') public showDelayModalOnClick: ModalDirective;
  @ViewChild('cancel') public showCancelModalOnClick: ModalDirective;
  modalRef: MDBModalRef;

  @Input() orderDetail;
  orderDetailDis = false;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    console.log('accepted data from parent',this.orderDetail);
  }

  events: string[] = [];

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);
  }
  onOpened(event: any) {
    console.log(event);
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
  DelayOrder(id, date) {
    console.log('delay order clicked', id, date);
    this.orderService.updateUserOrder(id,date).subscribe((res)=>{
      console.log('delay response', res);
    });
  }
  // cancel order modal
  cancelOrderModal() {
    console.log('delay order clicked');
    this.showCancelModalOnClick.show();
  
  }
  // cancel order
  cancelOrder(id,data) {
    console.log('cancel order clicked');
    this.orderService.cancelOrderedDelivery(id,data).subscribe((res)=>{
      console.log('delay response', res);
    });
  }

}
