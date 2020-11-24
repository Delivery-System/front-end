// built-in module
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './components/delivery/delivery.component';

// custom module
import { EdeliveryMateComponent } from './components/edelivery-mate/edelivery-mate.component';
import { EdeliveryComponent } from './components/edelivery/edelivery.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';

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
    path:'user/profile',
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
