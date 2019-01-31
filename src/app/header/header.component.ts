import { Component, OnInit } from "@angular/core";
import { SignInUpService } from "../shared/sign-in-up.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  user: any;
  role: any;
  constructor(private login: SignInUpService) {}

  ngOnInit() {
    this.login.user = localStorage.getItem("user");
    this.role = localStorage.getItem("role");
  }
}
