import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable, from } from "rxjs";
import { SignInUpService } from "./sign-in-up.service";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root"
})
export class RoleGuard implements CanActivate {
  constructor(private login: SignInUpService, private toastr: ToastrService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.login.loggedIn() && localStorage.getItem("role") == "Admin") {
      return true;
    } else {
      this.toastr.warning("Only Admins are allowed", "Access Denied");
      return false;
    }
  }
}
