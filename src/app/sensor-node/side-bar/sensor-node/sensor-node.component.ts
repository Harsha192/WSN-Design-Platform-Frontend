import { Component, Input, OnInit } from "@angular/core";
import { SensorNodeService } from "../../sensor-node.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-sensor-node",
  templateUrl: "./sensor-node.component.html",
  styleUrls: ["./sensor-node.component.css"]
})
export class SensorNodeComponent implements OnInit {
  @Input()
  sensorNode: any;

  constructor(
    private sensorNodeService: SensorNodeService,
    public route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  public dragM(event: any) {
    console.log(event);
    event.dataTransfer.setData("content", event.target.id);
    event.dataTransfer.effectAllowed = "copy";
  }

  dragging(event: any) {
    console.log("dragging");
  }

  deleteSN(sensorNodeId) {
    console.log(sensorNodeId);
    this.sensorNodeService
      .deleteSensorNode(sensorNodeId.split("_")[1])
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success(
            "Sensor Node Deleted Succesfully.",
            "Sensor Node"
          );
        },
        error => {
          this.toastr.error("Error Deleting Sensor Node.", "Sensor Node");
        }
      );
  }
}
