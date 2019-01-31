import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { SignInUpService } from "./sign-in-up.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private login: SignInUpService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.login.loggedIn() == false) {
      this.toastr.warning("Please Sign-In to access.", "Access Denied");
      this.router.navigate(["home"]);
    }
    return this.login.loggedIn();
    // return this.login.loggedIn();
  }
}
