// built-in module
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// custom module 
import { Order,CancelOrder } from '../modals/order';
import { Status } from '../modals/status';
import { UserProfile } from '../modals/userProfile'
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private API_URL_USERS = 'http://localhost:3000/users';
  private API_URL_ORDERS = 'http://localhost:3000/orders';
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  status: Status;
  orderDeliveryDetail(item: any, sourceAddress: String, destinationAddress: String, deliveryDate: Date, status: string, orderer: UserProfile, receiver: UserProfile): Observable<Order> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.authService.token
    });
    return this.httpClient.post<Order>(`${this.API_URL_ORDERS}/`, {
      item,
      sourceAddress,
      destinationAddress,
      deliveryDate,
      status,
      orderer,
      receiver
    }, { headers: headers })
      .pipe(map(res => res));;
  }

  getOrder(): Observable<Order> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.authService.token
    });
    return this.httpClient.get<Order>('http://localhost:3000/orders', { headers: headers })
      .pipe(map(res => res));
  }

  // get my order
  getFilteredOrders(data): Observable<Order> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.authService.token
    });
    console.log('filter', data);
    return this.httpClient.post<Order>(`${this.API_URL_ORDERS}/filter`, data, { headers: headers });
  }

  // update order
  updateUserOrder(id, data):Observable<Order> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.authService.token
    });
    return this.httpClient
      .patch<Order>(`${this.API_URL_ORDERS}/${id}`, data, { headers: headers })
      .pipe(map(res => res));
  }

  // cancel order
  cancelOrderedDelivery(id, data):Observable<CancelOrder>  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.authService.token
    });
    return this.httpClient
      .post<CancelOrder>(`${this.API_URL_ORDERS}/${id}`, data, { headers: headers })
      .pipe(map(res => res));
  }

  // unused
  setOrder(order) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.token
    });
    return this.httpClient
      .post(`${this.API_URL_ORDERS}/`, order, { headers: headers })
      .pipe(map(res => res));
  }

  getOrders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.token
    });
    return this.httpClient
      .get(`${this.API_URL_ORDERS}`, { headers: headers })
      .pipe(map(res => res));
  }

  // getOrder(order) {
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': this.authService.token
  //   });
  //   return this.httpClient
  //     .get(`${this.API_URL_ORDERS}/${order._id}`, { headers: headers })
  //     .pipe(map(res => res));
  // }



  getUsers() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .get(`${this.API_URL_USERS}/`, { headers: headers })
      .pipe(map(res => res));
  }
}
