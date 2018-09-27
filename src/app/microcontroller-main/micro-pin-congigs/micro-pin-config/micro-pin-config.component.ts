import { Component, OnInit, Input, Output } from '@angular/core';
import {MicrocontrollerDataService} from "../../microcontroller-data.service";

@Component({
  selector: 'app-micro-pin-config',
  templateUrl: './micro-pin-config.component.html',
  styleUrls: ['./micro-pin-config.component.css']
})
export class MicroPinConfigComponent implements OnInit {
  @Input()  componentId = null;
  @Output()  pinType: string ='';
  @Output()  pinName: string = '';

  updatePinType(event: Event){
    // console.log(event)
    this.pinType = (<HTMLInputElement>event.target).value;
  }

  updatePinName(event: Event) {
    this.pinName += (<HTMLInputElement>event.target).value;
  }

  constructor(private microDataService: MicrocontrollerDataService) { }

  ngOnInit() {
  }

  onDelete() {
    console.log(this.componentId-1);
    this.microDataService.pinsArray[this.componentId-1].destroy();
    this.microDataService.pinsArray[this.componentId-1] = null;
    console.log( this.microDataService.pinsArray);

  }

}
