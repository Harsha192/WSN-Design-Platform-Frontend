import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sensor-node',
  templateUrl: './sensor-node.component.html',
  styleUrls: ['./sensor-node.component.css']
})
export class SensorNodeComponent implements OnInit {

  @Input() sensorNode: any ;

  constructor() { }

  ngOnInit() {
  }

  public dragM (event: any) {
    console.log(event);
    event.dataTransfer.setData("content", event.target.id);
    event.dataTransfer.effectAllowed = "copy";
  }

  dragging(event: any) {
    console.log('dragging');
  }

}
