import { Component, OnInit } from "@angular/core";
import { NetworkConfigService } from "./network-config.service";
import { Response } from "@angular/http";
import { NgProgress } from "ngx-progressbar";
@Component({
  selector: "app-network-config",
  templateUrl: "./network-config.component.html",
  styleUrls: ["./network-config.component.css"],
  providers: [NetworkConfigService]
})
export class NetworkConfigComponent implements OnInit {
  constructor(
    private networkConfigService: NetworkConfigService,
    private ngProgress: NgProgress
  ) {}

  ngOnInit() {
    this.getSensorNodeData();
  }

  getSensorNodeData() {
    this.ngProgress.start();
    this.networkConfigService.getSensorNodeFromBackend().subscribe(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        for (let m of data) {
          this.networkConfigService.addSensorNodeFromBackend(m);
        }
        this.ngProgress.done();
      },
      error => console.log(error)
    );
  }
}
