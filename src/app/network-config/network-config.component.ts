import { Component, OnInit } from '@angular/core';
import {NetworkConfigService} from './network-config.service'
import {Response} from "@angular/http"

@Component({
  selector: 'app-network-config',
  templateUrl: './network-config.component.html',
  styleUrls: ['./network-config.component.css'],
  providers: [NetworkConfigService]
})
export class NetworkConfigComponent implements OnInit {

  constructor(private networkConfigService : NetworkConfigService) { }

  ngOnInit() {
    this.getSensorNodeData();
  }


  getSensorNodeData() {
    this.networkConfigService.getSensorNodeFromBackend()
      .subscribe(
        (response: Response)=> {
          const data  = response.json();
          console.log(data);
          for (let m of data){
            this.networkConfigService.addSensorNodeFromBackend(m);
          }
        },
        (error) => console.log(error)
      );
  }

}
