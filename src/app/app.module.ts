// built-in module
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaLoaderService } from 'ng-recaptcha';
import { NgxStripeModule } from 'ngx-stripe';
// import * as mapboxgl from 'mapbox-gl';
// material module
import { MaterialModule } from './material.module';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// custom module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EdeliveryMateComponent } from './components/edelivery-mate/edelivery-mate.component';
import { EdeliveryComponent } from './components/edelivery/edelivery.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { MdBootstrapModule } from './md-bootstrap.module';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { OrderComponent } from './components/order/order.component';
import { RecaptchalLoaderServiceService } from './services/recaptchal-loader-service.service';
import { OrderService } from './services/order.service';
import { ModalOrderEditComponent } from './components/modal-order-edit/modal-order-edit.component';
import { AdminDeliveryComponent } from './components/admin-delivery/admin-delivery.component';
import { AgentDeliveryComponent } from './components/agent-delivery/agent-delivery.component';
import { CompanyDeliveryComponent } from './components/company-delivery/company-delivery.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginDefaultComponent } from './components/login-default/login-default.component';
import { TelephoneFieldComponent } from './components/telephone-field/telephone-field.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { UpdateOrderStatusComponent } from './components/update-order-status/update-order-status.component';


@NgModule({
  declarations: [
    AppComponent,
    EdeliveryMateComponent,
    EdeliveryComponent,
    LoginComponent,
    RegistrationComponent,
    DeliveryComponent,
    OrderComponent,
    ModalOrderEditComponent,
    AdminDeliveryComponent,
    AgentDeliveryComponent,
    CompanyDeliveryComponent,
    OrderListComponent,
    ResetPasswordComponent,
    LoginDefaultComponent,
    TelephoneFieldComponent,
    CartComponent,
    PaymentComponent,
    OrderTableComponent,
    EditOrderComponent,
    OrderTrackingComponent,
    UpdateOrderStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdBootstrapModule,
    MaterialModule,
    RecaptchaV3Module,
    RecaptchaModule,
    RecaptchaFormsModule,
    MDBBootstrapModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_51HueDwBg545NKOukzKez7oE2rLvsCy7rHD81YLlicverape9EsTOsGGCdCOdDKrMgtSBM2eT2TCWZMSC3AzlI9qQ00h4z04Ih6'),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,OrderService,AuthGuard, 
    {provide: RECAPTCHA_V3_SITE_KEY, useValue: '<YOUR_SITE_KEY>'},
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'en', // use French language
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '<YOUR_KEY>' } as RecaptchaSettings,
    },
    {
      provide: RecaptchaLoaderService,
      useValue: new RecaptchalLoaderServiceService(),
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ModalOrderEditComponent
  ]
})
export class AppModule { }
