import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {MicrocontrollerDataService} from "../microcontroller-data.service";
import {Router} from "@angular/router";
import {MicroPinConfigComponent} from "./micro-pin-config/micro-pin-config.component";

@Component({
  selector: 'app-micro-pin-congigs',
  templateUrl: './micro-pin-congigs.component.html',
  styleUrls: ['./micro-pin-congigs.component.css']
})
export class MicroPinCongigsComponent implements OnInit {

  @ViewChild('pinsContainer', {read: ViewContainerRef}) pinsContainer;
  private pinCount :number = 0;

  constructor(private resolver: ComponentFactoryResolver, private microDataService: MicrocontrollerDataService,
              private router: Router ) { }

  ngOnInit() {
  }

  addNewPin() {

    // Add new pin-config component in to dom and add reference to array in service
    this.pinCount += 1;
    const myResolver = this.resolver.resolveComponentFactory(MicroPinConfigComponent);
    const pinRef = this.pinsContainer.createComponent(myResolver);
    pinRef.instance.componentId = this.pinCount;

    this.microDataService.pinsArray.push(pinRef);

    console.log(this.microDataService.pinsArray);
    console.log(this.pinCount);

  }

  addPinDetails() {
    // get pin details
    let pinsConfig = [];

    for (let pin of this.microDataService.pinsArray){
      if (pin != null){
        pinsConfig.push(
          {
            "pinType":pin.instance.pinType,
            "pinName":pin.instance.pinName
          }
        );
      }
    }

    this.microDataService.getMicrocontrollerPinData({"Pins":pinsConfig});

    console.log(this.microDataService.microcontrollerPinData);
    this.microDataService.addMicroControllerToBackend();

    this.router.navigateByUrl('/add-microcontroller/basic');
  }

}
