import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { SignInUpService } from "./sign-in-up.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoggedAuthGuard implements CanActivate {
  constructor(private login: SignInUpService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return !this.login.getUserLoggIn();
  }
}
