import {Component,  EventEmitter, Input, OnInit, Output} from '@angular/core';
import { sensorDataService } from '../../senser-data.service'

@Component({
  selector: 'app-pin-config',
  templateUrl: './pin-config.component.html',
  styleUrls: ['./pin-config.component.css']
})
export class PinConfigComponent implements OnInit {
  @Input()  componentId = null;
  @Output()  pinType: string ='';
  @Output() numberOfPins: string = '';

  updatePinType(event: Event){
    // console.log(event)
    this.pinType = (<HTMLInputElement>event.target).value;
  }

  updateNoOfPins(event: Event) {
    this.numberOfPins += (<HTMLInputElement>event.target).value;
  }

  constructor(private sensorService: sensorDataService) { }

  ngOnInit() {
  }
  onDelete() {

    // this.sensorSerice.deletePinThis.emit();
    console.log(this.componentId-1);
    this.sensorService.pinsArray[this.componentId-1].destroy();
    this.sensorService.pinsArray[this.componentId-1] = null;
    console.log( this.sensorService.pinsArray);

  }

}
