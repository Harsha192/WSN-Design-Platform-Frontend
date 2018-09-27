import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {SensorNodeService} from "../sensor-node.service";
import {Router} from "@angular/router";
import {ContainerComponent} from "../container/container.component";
import {Response} from "@angular/http"

@Component({
  selector: 'app-helper-menu',
  templateUrl: './helper-menu.component.html',
  styleUrls: ['./helper-menu.component.css']
})
export class HelperMenuComponent implements OnInit {

  constructor(private sensorNodeService: SensorNodeService, private router: Router) { }

  ngOnInit() {



  }
  onSubmit(form: NgForm){
    this.sensorNodeService.getSensorNodeHelperData(form.value);
    console.log(this.sensorNodeService.sensorNodeHelperData);

    // TODO : Make common data format for sensor node
    // TODO : Send data to backend
    console.log(ContainerComponent.nodes);
    console.log(this.sensorNodeService.communicationTypes);

    this.sensorNodeService.addSensorNodeConfiguration(ContainerComponent.nodes);
    this.sensorNodeService.addSensorNodeToBackend();



    this.router.navigateByUrl('/sensor-node');
  }






}
