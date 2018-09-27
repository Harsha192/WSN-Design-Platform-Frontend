import {
  Component, ComponentFactoryResolver,OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {PinConfigComponent} from './pin-config/pin-config.component';
import {sensorDataService} from "../senser-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pin-gonfigs',
  templateUrl: './pin-gonfigs.component.html',
  styleUrls: ['./pin-gonfigs.component.css']
})
export class PinGonfigsComponent implements OnInit {

  @ViewChild('pinsContainer', {read: ViewContainerRef}) pinsContainer;
  private pinCount :number = 0;
  constructor(private resolver: ComponentFactoryResolver, private sensorService: sensorDataService,
              private router: Router) { }

  ngOnInit() {
  }

  addNewPin() {

    // Add new pin-config component in to dom and add reference to array in service
    this.pinCount += 1;
    const myResolver = this.resolver.resolveComponentFactory(PinConfigComponent);
    const pinRef = this.pinsContainer.createComponent(myResolver);
    pinRef.instance.componentId = this.pinCount;

    this.sensorService.pinsArray.push(pinRef);

    console.log(this.sensorService.pinsArray);
    console.log(this.pinCount);

  }

  addPinDetails() {
    // get pin details
    let pinsConfig = [];

    for (let pin of this.sensorService.pinsArray){
      if (pin != null){
        pinsConfig.push(
          {
            "pinType":pin.instance.pinType,
            "numberOfPins":pin.instance.numberOfPins
          }
          );
      }
    }

    this.sensorService.getSensorPinData({"Pins":pinsConfig});

    console.log(this.sensorService.sensorPinData);

    this.router.navigateByUrl('/add-sensor/function');
  }

}
