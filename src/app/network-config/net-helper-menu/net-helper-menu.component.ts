import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NetworkConfigService} from "../network-config.service";
import {Router} from "@angular/router";
import {SharedService} from "../../shared/shared.service";
import {NetContainerComponent} from "../net-container/net-container.component";

@Component({
  selector: 'app-net-helper-menu',
  templateUrl: './net-helper-menu.component.html',
  styleUrls: ['./net-helper-menu.component.css']
})
export class NetHelperMenuComponent implements OnInit {

  constructor(private netConfigService: NetworkConfigService, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.netConfigService.getNetworkHelperData(form.value);
    console.log(this.netConfigService.networkHelperData);

    // TODO : Make common data format for sensor node
    // TODO : Send data to backend

    alert('Network Configured Successfully');

    this.netConfigService.createNetwork();

    this.netConfigService.addNetworkConfigToBackend();

    this.sharedService.addNodes = NetContainerComponent.nodes;


    this.router.navigateByUrl('/code-download');
  }

}
