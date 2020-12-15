import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  events: string[] = [];
  selectedCategory = 'furniture';
  selectedService = 'motor';

    // date picker
    myFilter = (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();
      // Prevent Saturday and Sunday from being selected.
      return day !== 0 && day !== 6;
    }
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);
  }

  // cancelOrder(order): void {
  //   let data = [
  //     {
  //       "propName": "status", "value": Status.CANCELLED
  //     },
  //     {
  //       "propName": "cancellationReason", "value": this.cancellationReason
  //     },
  //     {
  //       "propName": "cancellationFee", "value": 0.0
  //     }
  //   ];
  //   this.storeService.cancelOrder(order._id, data).subscribe((data: any) => {
  //     if (data.success) {
  //       alert(data.message)
  //       order.status = Status.CANCELLED;
  //       this.cancelClicked = false;
  //     } else {
  //       alert(data.message)
  //     }
  //   });
  // }

  // delayOrder(order): void {
  //   let data = [
  //     {
  //       "propName": "deliveryDate", "value": this.newDeliveryDate
  //     }
  //   ];
  //   this.storeService.updateOrder(order._id, data).subscribe((data: any) => {
  //     if (data.success) {
  //       alert(data.message)
  //       order.deliveryDate = this.newDeliveryDate;
  //     } else {
  //       alert(data.message)
  //     }
  //   });
  //   this.delayClicked = false;
  // }

 
}
