import { Component, OnInit } from '@angular/core';
import {NetworkDataService} from "./network-data.service";

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css'],
  providers: [NetworkDataService]
})
export class NetworkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
