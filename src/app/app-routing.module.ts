// built-in module
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// custom module
import { EdeliveryMateComponent } from './components/edelivery-mate/edelivery-mate.component';
import { EdeliveryComponent } from './components/edelivery/edelivery.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDeliveryComponent } from './components/admin-delivery/admin-delivery.component';
import { AgentDeliveryComponent } from './components/agent-delivery/agent-delivery.component';
import { CompanyDeliveryComponent } from './components/company-delivery/company-delivery.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { LoginDefaultComponent } from './components/login-default/login-default.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { Role } from './modals/role';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';


const routes: Routes = [
  // {
  //   path:'', redirectTo:'login',pathMatch:'full'
  // },
  {
    path:'order',
    component:OrderComponent
  },
  {
    path:'track',
    component:OrderTrackingComponent
  },
  {
    path:'orderTable',
    component:OrderTableComponent
  },
  {
    path:'payment',
    component:PaymentComponent
  },
  {
    path:'order/delivery',
    component:DeliveryComponent
  },
  {
    path:'user/admin',
    component:AdminDeliveryComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path:'user/company',
    component:CompanyDeliveryComponent,
    // canActivate:[AuthGuard]
  },
  {
    path:'user/agent',
    component:AgentDeliveryComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Agent] }
  },
  {
    path:'user/endUser',
    component:EdeliveryComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.EndUser] }
  },
  {
    path:'defualtLogin',
    component:LoginDefaultComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegistrationComponent
  },
  {
    path:'',
    component:EdeliveryMateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
