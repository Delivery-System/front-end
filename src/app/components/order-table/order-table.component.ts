// built-in module
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';


// import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';

// custom module
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from '../../modals/order';
import { User } from 'src/app/modals/user';


@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  userOrder:any=[];
  orders: Array<Order>;
  elements: any = [];
  file:string;
  headElements = ['orderId', 'orderName', 'orderDate', 'Action'];

  maxVisibleItems: number = 7;

  searchText: string ;
  previous: string;
  constructor(private cdRef: ChangeDetectorRef, private authService: AuthService, private orderService: OrderService) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  ngOnInit(): void {
    // for (let i = 1; i <= 35; i++) {
    //   this.elements.push({ orderId: i.toString(), orderName: 'Shelf ' + i, orderDate: '12/12/2020 ' + i, Action: 'Handle ' + i });
    // }

    this.getmyOrder();
    // console.log('user order:', this.authService.currentUserValue);
    // const filter =
    // {
    //   "orderer.email": this.authService.currentUserValue.account.email

    // }
    // console.log('filter',filter['orderer.email']);
    // this.orderService.getFilteredOrders(filter).subscribe((res) => {
    //       console.log('res',res);
    //       this.elements=res;
    //       console.log( 'my orders',this.elements);
          
    // },
    //   err => {
    //     console.log(err);
    //     return false;
    //   });
    // console.log('order array', this.userOrder);
    // console.log('current', this.authService.currentUserValue.account.email);
    console.log( 'my orders outside',this.elements);
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();

    
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  addNewRow() {
    this.mdbTable.addRow({
      orderId: this.elements.length.toString(),
      orderName: 'Wpis ' + this.elements.length,
      orderDate: 'Last ' + this.elements.length,
      Action: 'Handle ' + this.elements.length
    });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, { orderId: '2', orderName: 'Nowy', last: 'Row', Action: 'Kopytkowy' });
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.orderId = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.orderId = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  async getmyOrder() {
    console.log('user order:', this.authService.currentUserValue);
    const filter =
    {
      "orderer.email": this.authService.currentUserValue.account.email
    }
    console.log('filter',filter['orderer.email']);
    this.elements= await this.orderService.getFilteredOrders(filter).toPromise();
    // this.orderService.getFilteredOrders(filter).subscribe((res) => {
    //       console.log('res',res);
    //       this.elements=res;
    //       this.file='hello';
    //       console.log( 'my orders',this.elements);
    //       console.log('1',this.file);
    // },
    //   err => {
    //     console.log(err);
    //     return false;
    //   });
    console.log('order array', this.userOrder);
    console.log('current', this.authService.currentUserValue.account.email);
    console.log( 'my orders outside',this.elements);
    console.log('1',this.file);
  }
}
