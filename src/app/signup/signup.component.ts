import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SignInUpService } from "../shared/sign-in-up.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private login: SignInUpService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    var newUser = {
      username: form.value.name,
      email: form.value.email,
      password: form.value.password,
      role: "User"
    };

    this.login.signUp(newUser);
  }
}
