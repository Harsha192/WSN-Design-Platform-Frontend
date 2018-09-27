import { Component, OnInit } from '@angular/core';
import {MicrocontrollerDataService} from './microcontroller-data.service'

@Component({
  selector: 'app-microcontroller-main',
  templateUrl: './microcontroller-main.component.html',
  styleUrls: ['./microcontroller-main.component.css'],
  providers: [MicrocontrollerDataService]
})
export class MicrocontrollerMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
