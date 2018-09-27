import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {MicrocontrollerDataService} from "../microcontroller-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basic-micro-data',
  templateUrl: './basic-micro-data.component.html',
  styleUrls: ['./basic-micro-data.component.css']
})
export class BasicMicroDataComponent implements OnInit {

  constructor(private microDataService: MicrocontrollerDataService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    this.microDataService.getMicrocontrollerBasicData(form.value);
    console.log(this.microDataService.getMicrocontrollerBasicData);


     this.router.navigateByUrl('/add-microcontroller/pin');
  }

}
