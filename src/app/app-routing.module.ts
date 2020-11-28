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

const routes: Routes = [
  {
    path:'order',
    component:OrderComponent
  },
  {
    path:'order/delivery',
    component:DeliveryComponent
  },
  {
    path:'user/admin',
    component:AdminDeliveryComponent,
    // canActivate:[AuthGuard]
  },
  {
    path:'user/company',
    component:CompanyDeliveryComponent,
    // canActivate:[AuthGuard]
  },
  {
    path:'user/agent',
    component:AgentDeliveryComponent,
    // canActivate:[AuthGuard]
  },
  {
    path:'user/endUser',
    component:EdeliveryComponent,
    // canActivate:[AuthGuard]
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
