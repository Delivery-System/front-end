import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

// import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit ,AfterViewInit {

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
   
  }
  ngAfterViewInit() {
    
  }
 
}
