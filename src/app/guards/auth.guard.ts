// built-in modules
import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// custom modules
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router: Router){}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.authService.isLoggedIn;
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    console.log( this.authService.currentUserValue);
    if (currentUser) {
      // check if route is restricted by role
      console.log(currentUser.account.username);
      if (route.data.roles && route.data.roles.indexOf(currentUser.account.role) === -1) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
  
}
