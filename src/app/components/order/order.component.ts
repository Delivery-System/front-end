// built-in modules
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { RecaptchaFormsModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MDBModalRef, MDBModalService, ModalDirective } from "angular-bootstrap-md";
import { Router } from '@angular/router';
// custom module
import { OrderService } from 'src/app/services/order.service';
import { MyTel } from 'src/app/modals/myTel';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { event } from 'jquery';
import { Item } from 'src/app/modals/item';
import { Status } from 'src/app/modals/status';
import { UserProfile } from 'src/app/modals/userProfile';
import { Role } from 'src/app/modals/role';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceType, typePrice } from '../../modals/serviceType';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {

  @ViewChild('row', { static: true }) row: ElementRef;
  @ViewChild('frame') public showModalOnClick: ModalDirective;
  modalRef: MDBModalRef;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  selectedCategory = 'furniture';
  selectedService = 'motor';
  deliveryDate: '';

  markers: any;
  targetValue; itemName; itemCategory; sourceAddress; destAddress; serviceType; deliveryDueDate;
  firstName; lastName; email; address; phone;

  orderItem;
  orderer;
  receiver;
  status = Status.PENDING;

  form: FormGroup = new FormGroup({
    tel: new FormControl(new MyTel('', '', ''))
  });



  // date picker
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  constructor(private _formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private recaptchaV3Service: ReCaptchaV3Service, private authService: AuthService, private orderService: OrderService) { }

  validatingForm: FormGroup;
  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    // this.secondFormGroup = this._formBuilder.group({
    //   // secondCtrl: '',
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   email: ['', Validators.required],

    // });
    // const currentUser = this.authService.currentUserValue;
    // this.secondFormGroup.setValue(currentUser.account);
    // map
    // ADD THIS PART
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('pk.eyJ1IjoibHlkaWEtc29sIiwiYSI6ImNraTYxMjZ5azE0bW8zMHFzZWdzOHdmd2IifQ.dqhGUGNQM1gdZUcACgTHzQ');
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.markers = this.createMap('map');

  }
  ngAfterViewInit() {
  }
  onOpen(event: any) {
    console.log(event);
  }

  createMap(container) {
    let style = 'mapbox://styles/mapbox/streets-v11';
    let lng = 38.7;
    let lat = 9.0;

    let map = new mapboxgl.Map({
      container: container,
      style: style,
      zoom: 10, //use 10
      center: [lng, lat] // [lng, lat]
    });

    let src_marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ closeOnClick: false, closeButton: false }).setText("Pick up"))
      .addTo(map)
      .togglePopup();

    let dest_marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([lng + 0.05, lat + 0.05])
      .setPopup(new mapboxgl.Popup({ closeOnClick: false, closeButton: false }).setText("Drop off"))
      .addTo(map)
      .togglePopup();

    map.addControl(
      new mapboxgl.NavigationControl()
    );
    let markers = {
      src: src_marker,
      dest: dest_marker
    };

    var src_geocoder = new MapboxGeocoder({
      accessToken: 'pk.eyJ1IjoibHlkaWEtc29sIiwiYSI6ImNraTYxMjZ5azE0bW8zMHFzZWdzOHdmd2IifQ.dqhGUGNQM1gdZUcACgTHzQ', // Set the access token
      placeholder: 'Enter pick up',
      bbox: [36.892090, 8.097300, 40.602722, 9.912038],
      proximity: {
        longitude: lng,
        latitude: lat
      },
      mapboxgl: mapboxgl,
      marker: false,
    });

    map.addControl(src_geocoder);

    var dest_geocoder = new MapboxGeocoder({
      accessToken: 'pk.eyJ1IjoibHlkaWEtc29sIiwiYSI6ImNraTYxMjZ5azE0bW8zMHFzZWdzOHdmd2IifQ.dqhGUGNQM1gdZUcACgTHzQ', // Set the access token
      placeholder: 'Enter drop off',
      bbox: [36.892090, 8.097300, 40.602722, 9.912038],
      proximity: {
        longitude: lng,
        latitude: lat
      },
      mapboxgl: mapboxgl,
      marker: false,
    });
    map.addControl(dest_geocoder);

    map.on('load', function () {
      map.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      src_geocoder.on('result', function (e) {
        src_marker
          .setLngLat(e.result.geometry.coordinates)
          .addTo(map)
          .on('dragend', onDragEnd);
      });
      dest_geocoder.on('result', function (e) {
        dest_marker
          .setLngLat(e.result.geometry.coordinates)
          .addTo(map)
          .on('dragend', onDragEnd);

        let src_lnglat = src_marker.getLngLat();
        let dest_lnglat = dest_marker.getLngLat();
        map.fitBounds([
          [src_lnglat.lng, src_lnglat.lat],
          [dest_lnglat.lng, dest_lnglat.lat]
        ]);
      });


    });

    function onDragEnd() {
      var lngLat = src_marker.getLngLat();
      let lat = lngLat.lat;
      let lng = lngLat.lng
      let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lng + "," + lat + ".json?access_token=" + mapboxgl.accessToken;
      $.get(url, function (data) {
        let myData = data;
        // document.querySelector('.mapboxgl-ctrl-geocoder--input').placeholder = myData.features[0].text;
      });
    }
    src_marker.on('dragend', onDragEnd);

    return markers;
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // this.deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
  // calculateFee(distance, weight) {
  //   const level0 = 50;
  //   const level
  // }

  // order form submission

  events: string[] = [];

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);
  }
  // order detail
  orderDetail(event) {
    console.log('order detail');
    const targetValue = event.target;
    this.itemName = targetValue.querySelector('#itemName').value;
    this.itemCategory = this.selectedCategory;
    this.sourceAddress = targetValue.querySelector('#sourceAddress').value;
    this.destAddress = targetValue.querySelector('#destAddress').value;
    this.deliveryDueDate = this.events[1];
    this.serviceType = this.selectedService;
    console.log(this.itemName, this.itemCategory, this.sourceAddress, this.destAddress, this.deliveryDueDate, this.serviceType);

  }
  // personal info 
  // order delivery
  orderDelivery(event) {
    console.log('user info:', this.authService.currentUserValue.account.username);
    console.log('personal info');

    // personal info detail
    const targetValue = event.target;
    this.firstName = targetValue.querySelector('#firstName').value;
    this.lastName = targetValue.querySelector('#lastName').value;
    this.email = targetValue.querySelector('#email').value;
    this.address = targetValue.querySelector('#address').value;
    this.phone = targetValue.querySelector('#phone').value;

    // order delivery
    // create array for  data 

    this.orderItem = {
      'name': this.itemName,
      'category': this.itemCategory,
      'weightRange': this.selectedService,
      'quantity': 1
    }

    this.receiver = {
      'firstName': this.firstName,
      'lastName': this.lastName,
      'email': this.email,
      'phoneNumber': this.phone,
    }
    console.log(this.firstName, this.lastName, this.email, this.address, this.deliveryDueDate, this.phone);
    console.log('add to  clicked');
    console.log(this.orderItem, this.sourceAddress, this.destAddress, this.deliveryDueDate, '', this.orderer, this.receiver);

    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      let firstName = document.getElementById('#firstName');
      // firstName.setValue( currentUser.account.firstName)
      this.orderer = {
        'role': Role.EndUser,
        'firstName': currentUser.account.firstName,
        'lastName': currentUser.account.lastName,
        'username': currentUser.account.username,
        'email': currentUser.account.email,
        'password': '',
        'address': this.address,
        'phoneNumber': this.phone,
      }
      console.log('ready to order',315);
      let shippingCost = this.calculateCostEstimation(this.selectedService);
      console.log('shippingCost', shippingCost);
      this.orderService.orderDeliveryDetail(this.orderItem, this.sourceAddress, this.destAddress, this.deliveryDueDate, '', this.orderer, this.receiver)
        .subscribe((res) => {
          console.log('order succeded', res);
          this.showModalOnClick.show();
        })
    }
    else {
      this.orderer = {
        'role': Role.EndUser,
        'firstName': this.firstName,
        'lastName': this.lastName,
        'username': '',
        'email': this.email,
        'password': '',
        'address': this.address,
        'phoneNumber': this.phone,
      }

      console.log('ready to order',315);
      let shippingCost = this.calculateCostEstimation(this.selectedService);
      console.log('shippingCost', shippingCost);
      this.orderService.orderDeliveryDetail(this.orderItem, this.sourceAddress, this.destAddress, this.deliveryDueDate, '', this.orderer, this.receiver)
        .subscribe((res) => {
          console.log('order succeded', res);

          // @ViewChild('frame') public showModalOnClick: ModalDirective;
          this.showModalOnClick.show();
          //   const modalOption = {
          //     backdrop: true, keyboard: true, focus: true, show: true,
          //     ignoreBackdropClick: false, animated: true, containerClass: 'overflow-auto',
          //     class: 'modal-md',
          //     data: {

          //     }
          //   };
          //   this.modalRef = this.modalService.show(ResetPasswordComponent, modalOption);
        })
    }

  }

  // cost estimation
  calculateFee(serviceType) {
    // location in km
    let src_lngLat = this.markers.src.getLngLat();
    let dest_lngLat = this.markers.dest.getLngLat();
    let src_lat = src_lngLat.lat;
    let src_lng = src_lngLat.lng;
    let dest_lat = dest_lngLat.lat;
    let dest_lng = dest_lngLat.lng;

    let km = this.getDistanceFromLatLonInKm(src_lat, src_lng, dest_lat, dest_lng);

    let fee = serviceType.price * km;
    alert("The price will be " + fee);

    return fee;
  }

  calculateCostEstimation(servicetype) {
    if (servicetype == 'motor') {
      console.log(typePrice.motor);
      console.log(this.calculateFee(typePrice.motor));
    }
    if (servicetype == 'sedan') {
      console.log(typePrice.sedan);
      console.log(this.calculateFee(typePrice.sedan));
    }
    if (servicetype == 'damas') {
      console.log(typePrice.damas);
      console.log(this.calculateFee(typePrice.damas));
    }
    if (servicetype == 'pickup') {
      console.log(typePrice.pickup);
      console.log(this.calculateFee(typePrice.pickup));
    }
    if (servicetype == 'miniIsuzuOpen') {
      console.log(typePrice.miniIsuzuOpen);
      console.log(this.calculateFee(typePrice.miniIsuzuOpen));
    }
    if (servicetype == 'miniIsuzuVan') {
      console.log(typePrice.miniIsuzuVan);
      console.log(this.calculateFee(typePrice.miniIsuzuVan));
    }
    if (servicetype == 'isuzuVan') {
      console.log(this.serviceType.isuzuVan);
      console.log(this.calculateFee(this.serviceType.isuzuVan));
    }
    if (servicetype == 'sinoTrack') {
      console.log(this.serviceType.sinoTrack);
      console.log(this.calculateFee(this.serviceType.sinoTrack));
    }
  }



}
