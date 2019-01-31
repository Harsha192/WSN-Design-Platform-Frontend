import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SensorNodeService } from "../sensor-node.service";
import { Router } from "@angular/router";
import { ContainerComponent } from "../container/container.component";
import { Response } from "@angular/http";

@Component({
  selector: "app-helper-menu",
  templateUrl: "./helper-menu.component.html",
  styleUrls: ["./helper-menu.component.css"]
})
export class HelperMenuComponent implements OnInit {
  constructor(
    private sensorNodeService: SensorNodeService,
    private router: Router
  ) {}
  communicationMethods;
  ngOnInit() {
    this.sensorNodeService.getCommunicationMethods().subscribe(data => {
      this.communicationMethods = [];

      console.log(data.json());
      data.json().forEach(element => {
        this.communicationMethods.push(element);
      });
      console.log(this.communicationMethods);
    });
  }
  onSubmit(form: NgForm) {
    this.sensorNodeService.getSensorNodeHelperData(form.value);
    console.log(form);

    // TODO : Make common data format for sensor node
    // TODO : Send data to backend
    console.log(ContainerComponent.nodes);
    console.log(this.sensorNodeService.communicationTypes);

    this.sensorNodeService.addSensorNodeConfiguration(ContainerComponent.nodes);
    this.sensorNodeService.addSensorNodeToBackend();

    this.router.navigateByUrl("/sensor-node");
  }
}
