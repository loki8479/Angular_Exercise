import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    let status: boolean = false;
    const userDetails: any = localStorage.getItem('user');
    if (userDetails !== null && userDetails !== undefined && userDetails !== "" && userDetails !== JSON.stringify("{}")) {
      const user: any = JSON.parse(userDetails) || {};
      if (user.name !== "" && user.name !== undefined && user.name !== null) {
        status = true;
      } else {
        status = false;
        localStorage.clear();
        this.router.navigateByUrl("/login");
      }
    } else {
      status = false;
      localStorage.clear();
      this.router.navigateByUrl("/login");
    }
    return status;
  }
}
