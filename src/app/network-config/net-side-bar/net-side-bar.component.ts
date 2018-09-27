import { Component, OnInit } from '@angular/core';
import {NetworkConfigService} from "../network-config.service";

@Component({
  selector: 'app-net-side-bar',
  templateUrl: './net-side-bar.component.html',
  styleUrls: ['./net-side-bar.component.css']
})
export class NetSideBarComponent implements OnInit {

  sensorNodes = null;

  constructor(private netConfigService: NetworkConfigService) { }

  ngOnInit() {
    this.sensorNodes = this.netConfigService.getSensorNodes();
  }

}
