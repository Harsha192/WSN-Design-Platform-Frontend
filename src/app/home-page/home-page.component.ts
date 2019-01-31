import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SignInUpService } from "../shared/sign-in-up.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  constructor(private login: SignInUpService, private router: Router) {}

  ngOnInit() {
    if (this.login.loggedIn()) {
      this.router.navigate(["sensor-node"]);
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.login.login(form.value.email, form.value.password);
    form.reset();
  }
}
