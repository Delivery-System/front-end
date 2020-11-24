// built-in module
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// custom module 
import { Order } from '../modals/order';
import { Status } from '../modals/status';
import { UserProfile } from '../modals/userProfile'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

     status: Status;
  orderDeliveryDetail(item:any,sourceAddress:String,destinationAddress: String,deliveryDate: Date, status: Status,orderer:UserProfile,receiver:UserProfile,Assignee:UserProfile):Observable<Order>{
    return this.http.post<Order>('http://localhost:3000/orders',{
      item,
      sourceAddress,
      destinationAddress,
      deliveryDate,
      status,
      orderer,
      receiver,
      Assignee
    });
  }
}
