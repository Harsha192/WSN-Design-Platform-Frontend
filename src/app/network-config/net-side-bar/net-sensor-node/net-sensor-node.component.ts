import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-net-sensor-node',
  templateUrl: './net-sensor-node.component.html',
  styleUrls: ['./net-sensor-node.component.css']
})
export class NetSensorNodeComponent implements OnInit {

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
