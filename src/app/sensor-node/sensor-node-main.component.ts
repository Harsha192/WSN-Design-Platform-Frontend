import {Component, OnChanges, OnInit} from '@angular/core';
import {SensorNodeService} from "./sensor-node.service";
import {Response} from "@angular/http"
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-sensor-node-main',
  templateUrl: './sensor-node-main.component.html',
  styleUrls: ['./sensor-node-main.component.css'],
  providers: [SensorNodeService]
})
export class SensorNodeMainComponent implements OnInit {

  constructor(private sensorNodeService : SensorNodeService) { }

  ngOnInit() {
    this.getMicrocontrollerData();
    this.getSensorData();
    this.getSensorNodeData();
    this.getCommunicationData();

  }


  getMicrocontrollerData() {
    this.sensorNodeService.getMicrocontrollersFromBackend()
      .subscribe(
        (response: Response)=> {
          const data  = response.json();
          console.log(data);
          for (let m of data){
            this.sensorNodeService.addMicrocontrollerFromBackend(m);
          }
        },
        (error) => console.log(error)
      );
  }

  getSensorData() {
    this.sensorNodeService.getSensorsFromBackend()
      .subscribe(
        (response: Response)=> {
          const data  = response.json();
          console.log(data);
          for (let m of data){
            this.sensorNodeService.addSensorFromBackend(m);
          }
        },
        (error) => console.log(error)
      );
  }

  getSensorNodeData() {
    this.sensorNodeService.getSensorNodesFromBackend()
      .subscribe(
        (response: Response)=> {
          const data  = response.json();
          console.log(data);
          for (let m of data){
            this.sensorNodeService.addSensorNodeFromBackend(m);
          }
        },
        (error) => console.log(error)
      );
  }

  getCommunicationData() {
    this.sensorNodeService.getCommunicationTypesFromBackend()
      .subscribe(
        (response: Response)=> {
          const data  = response.json();
          console.log(data);
          for (let m of data){
            this.sensorNodeService.addCommunicationFromBackend(m);
          }
        },
        (error) => console.log(error)
      );
  }


}
