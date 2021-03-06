import { Component, Input, OnInit } from "@angular/core";
import { SensorNodeService } from "../../sensor-node.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

declare var jQuery: any;

@Component({
  selector: "app-sensor-sidebar",
  templateUrl: "./sensor.component.html",
  styleUrls: ["./sensor.component.css"]
})
export class SensorSidebarComponent implements OnInit {
  @Input()
  sensor: any;

  constructor(
    private sensorNodeService: SensorNodeService,
    public route: Router,
    private toastr: ToastrService
  ) {
    jQuery(".icon.green.button.button_size").popup();
  }

  ngOnInit() {}

  public dragM(event: any) {
    console.log(event);
    event.dataTransfer.setData("content", event.target.id);
    event.dataTransfer.effectAllowed = "copy";
  }

  dragging(event: any) {
    console.log("dragging");
  }

  deleteS(sensorId) {
    console.log(sensorId.split("_")[1]);
    this.sensorNodeService.deleteSensor(sensorId.split("_")[1]).subscribe(
      res => {
        console.log(res);
        this.toastr.success("Sensor Deleted Succesfully.", "Sensor");
      },
      error => {
        this.toastr.error("Error Deleting Sensor.", "Sensor");
      }
    );
  }
}
