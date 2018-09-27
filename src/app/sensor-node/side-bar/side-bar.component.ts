import { Component, OnInit } from "@angular/core";
import { SensorNodeService } from "../sensor-node.service";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"]
})
export class SideBarComponent implements OnInit {
  microcontrollers = null;
  sensors = null;
  sensorNodes = null;

  constructor(private sensorNodeService: SensorNodeService) {}

  ngOnInit() {
    this.microcontrollers = this.sensorNodeService.getMicrocontrollers();
    this.sensors = this.sensorNodeService.getSensors();
    this.sensorNodes = this.sensorNodeService.getSensorNodes();
    console.log("--------------------------");
    console.log(this.sensors);

    // this.microcontrollers = [
    //   {
    //     microcontrollerDescription: "microcontroller description 1",
    //     microcontrollerId: "microcontroller id 1",
    //     microcontrollerDisplayName: "microcontroller display name 1"
    //   },
    //   {
    //     microcontrollerDescription: "microcontroller description 2",
    //     microcontrollerId: "microcontroller id 2",
    //     microcontrollerDisplayName: "microcontroller display name 2"
    //   }
    // ];
  }
}
