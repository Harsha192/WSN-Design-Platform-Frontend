import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Router } from "@angular/router";
// import { JwtHelperService } from "@auth0/angular-jwt";
import { tokenNotExpired } from "angular2-jwt";
import { SharedService } from "./shared.service";
import { from } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class SignInUpService {
  isUserLoggedIn: boolean;
  authToken: any;
  user: any;

  constructor(
    private http: Http,
    private router: Router, // private jwtHelper: JwtHelperService
    private sharedService: SharedService,
    private toastr: ToastrService
  ) {
    this.isUserLoggedIn = false;
  }

  setUserLoggIn() {
    this.isUserLoggedIn = true;
  }
  getUserLoggIn() {
    return this.isUserLoggedIn;
  }

  login(email, password) {
    // if (username == "admin@admin.com" && password == "adminadmin") {
    //   this.setUserLoggIn();
    //   this.router.navigate(["sensor-node"]);
    // }
    var header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Access-Control-Allow-Origin", "http://localhost:4200");
    var logUser = {
      email: email,
      password: password
    };
    this.http
      .post(
        this.sharedService.backendURL + "/users/log_in",
        JSON.stringify(logUser),
        {
          headers: header
        }
      )
      .subscribe(response => {
        console.log(response.json());
        // if (response.json() == true) {
        //   console.log(response.json());
        //   this.setUserLoggIn();
        //   this.router.navigate(["sensor-node"]);
        // }
        if (response.json().success == "true") {
          console.log(response.json().token);
          this.storeUserData(
            response.json().token,
            response.json().appUser,
            response.json().role
          );
          this.router.navigate(["sensor-node"]);
        } else {
          this.toastr.error("Please try again.", "Login Failed");
        }
      });
  }

  storeUserData(token, user, role) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", user);
    localStorage.setItem("role", role);
    console.log(this.loggedIn());
    console.log(localStorage.getItem("user"));
    this.authToken = token;
    this.user = localStorage.getItem("user");
  }

  loadToken() {
    this.authToken = localStorage.getItem("id_token");
    this.user = localStorage.getItem("user");
  }

  loggedIn() {
    return tokenNotExpired("id_token");
  }

  logout() {
    this.isUserLoggedIn = false;
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.router.navigate(["home"]);
  }

  signUp(newUser) {
    console.log(JSON.stringify(newUser));
    var header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Access-Control-Allow-Origin", "http://localhost:4200");
    this.http
      .post(
        this.sharedService.backendURL + "/users/sign_up",
        JSON.stringify(newUser),
        {
          headers: header
        }
      )
      .subscribe(response => {
        console.log(response.status);
        if (response.status === 200) {
          this.router.navigate(["home"]);
        }
      });
    // if (
    //   newUser.name == "abc" &&
    //   newUser.email == "abc@gmail.com" &&
    //   newUser.password == "123456"
    // ) {

    // }
  }
}
