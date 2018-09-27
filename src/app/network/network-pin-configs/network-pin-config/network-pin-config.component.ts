import {Component, Input, OnInit, Output} from '@angular/core';
import {NetworkDataService} from "../../network-data.service";

@Component({
  selector: 'app-network-pin-config',
  templateUrl: './network-pin-config.component.html',
  styleUrls: ['./network-pin-config.component.css']
})
export class NetworkPinConfigComponent implements OnInit {

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

  constructor(private networkDataService: NetworkDataService) { }

  ngOnInit() {
  }

  onDelete() {
    console.log(this.componentId-1);
    this.networkDataService.pinsArray[this.componentId-1].destroy();
    this.networkDataService.pinsArray[this.componentId-1] = null;
    console.log( this.networkDataService.pinsArray);
  }

}
