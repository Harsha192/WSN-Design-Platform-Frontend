import { Component, Input, OnInit } from "@angular/core";
import { SensorNodeService } from "../../sensor-node.service";
import { ToastrService } from "ngx-toastr";

declare var jQuery: any;

@Component({
  selector: "app-microcontroller",
  templateUrl: "./microcontroller.component.html",
  styleUrls: ["./microcontroller.component.css"]
})
export class MicrocontrollerComponent implements OnInit {
  @Input()
  microcontroller: any;
  microcontrollers = null;
  constructor(
    private sensorNodeService: SensorNodeService,
    private toastr: ToastrService
  ) {
    jQuery(".ui.icon.blue.button.button_size").popup();
  }

  ngOnInit() {
    this.microcontrollers = this.sensorNodeService.getMicrocontrollers();
  }

  public dragM(event: any) {
    console.log(event);
    event.dataTransfer.setData("content", event.target.id);
    event.dataTransfer.effectAllowed = "copy";
  }

  dragging(event: any) {
    console.log("dragging");
  }

  deleteMC(microcontrollerId) {
    console.log(microcontrollerId.split("_")[1]);
    this.sensorNodeService
      .deleteMicrocontroller(microcontrollerId.split("_")[1])
      .subscribe(
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
