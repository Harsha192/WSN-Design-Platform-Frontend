import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {MicrocontrollerDataService} from "../microcontroller-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-micro-functions',
  templateUrl: './micro-functions.component.html',
  styleUrls: ['./micro-functions.component.css']
})
export class MicroFunctionsComponent implements OnInit {

  constructor(private microDataService: MicrocontrollerDataService , private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.microDataService.getMicrocontrollerFunctionData(form.value);
    console.log(this.microDataService.microcontrollerFunctionData);

    this.router.navigateByUrl('/add-microcontroller/basic');

    //TODO : Call function at service to add data to backend
  }

}
