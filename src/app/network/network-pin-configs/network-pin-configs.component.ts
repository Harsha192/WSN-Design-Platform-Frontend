import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {NetworkDataService} from "../network-data.service";
import {NetworkPinConfigComponent} from "./network-pin-config/network-pin-config.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-network-pin-configs',
  templateUrl: './network-pin-configs.component.html',
  styleUrls: ['./network-pin-configs.component.css']
})
export class NetworkPinConfigsComponent implements OnInit {

  @ViewChild('pinsContainer', {read: ViewContainerRef}) pinsContainer;
  private pinCount :number = 0;

  constructor(private resolver: ComponentFactoryResolver, private networkDataService: NetworkDataService,
              private router: Router) { }

  ngOnInit() {
  }

  addNewPin() {

    // Add new pin-config component in to dom and add reference to array in service
    this.pinCount += 1;
    const myResolver = this.resolver.resolveComponentFactory(NetworkPinConfigComponent);
    const pinRef = this.pinsContainer.createComponent(myResolver);
    pinRef.instance.componentId = this.pinCount;

    this.networkDataService.pinsArray.push(pinRef);

    console.log(this.networkDataService.pinsArray);
    console.log(this.pinCount);

  }

  addPinDetails() {
    // get pin details
    let pinsConfig = [];

    for (let pin of this.networkDataService.pinsArray){
      if (pin != null){
        pinsConfig.push(
          {
            "pinType":pin.instance.pinType,
            "numberOfPins":pin.instance.numberOfPins
          }
        );
      }
    }
    this.networkDataService.getNetworkPinData({"Pins":pinsConfig});
    console.log(this.networkDataService.networkPinData);

    this.router.navigateByUrl('/add-network/function');
  }

}
