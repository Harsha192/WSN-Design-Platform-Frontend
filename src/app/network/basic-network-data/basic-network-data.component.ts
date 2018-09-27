import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NetworkDataService} from "../network-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basic-network-data',
  templateUrl: './basic-network-data.component.html',
  styleUrls: ['./basic-network-data.component.css']
})
export class BasicNetworkDataComponent implements OnInit {
  hardwarePlatforms = ['Yes', 'No'];

  constructor(private networkDataService: NetworkDataService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.networkDataService.getNetworkBasicData(form.value);
    console.log(this.networkDataService.networkBasicData);

    // if(form.value.hardwarePlatform == 'Inbuilt'){
    //   this.router.navigateByUrl('/add-network/function');
    // }else {
    //   this.router.navigateByUrl('/add-network/pin');
    // }

    this.router.navigateByUrl('/add-network/pin');

  }

}
