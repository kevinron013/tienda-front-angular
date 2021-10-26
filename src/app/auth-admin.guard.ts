import { Injectable } from "@angular/core";
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from "./services/users/users.service";

@Injectable({
  providedIn: "root"
})
export class AuthAdminGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private userService: UsersService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log(this.userService.isAdmin)
    if (this.userService.isAdmin) {
      return true;
    } else {
      this.router.navigateByUrl("");
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.isAdmin) {
      return true;
    } else {
      this.router.navigateByUrl("");
      return false;
    }
  }
}
