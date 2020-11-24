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

@NgModule({
  declarations: [
    AppComponent,
    EdeliveryMateComponent,
    EdeliveryComponent,
    LoginComponent,
    RegistrationComponent,
    DeliveryComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdBootstrapModule,
    RecaptchaV3Module,
    RecaptchaModule,
    RecaptchaFormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthService,AuthGuard, 
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
  bootstrap: [AppComponent]
})
export class AppModule { }
