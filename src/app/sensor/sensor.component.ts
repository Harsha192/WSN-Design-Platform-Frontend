import { Component, OnInit } from '@angular/core';
import { sensorDataService } from './senser-data.service'
import {SensorNodeService} from '../sensor-node/sensor-node.service'
@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
  providers: [sensorDataService, SensorNodeService]
  
})
export class SensorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
