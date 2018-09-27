import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {Router} from "@angular/router";
import {NetworkDataService} from "../network-data.service";
import {NetworkFunctionComponent} from "./network-function/network-function.component";

@Component({
  selector: 'app-network-functions',
  templateUrl: './network-functions.component.html',
  styleUrls: ['./network-functions.component.css']
})
export class NetworkFunctionsComponent implements OnInit {

  @ViewChild('functionContainer', {read: ViewContainerRef}) functionContainer;
  private functionCount :number = 0;

  constructor(private resolver: ComponentFactoryResolver, private networkDataService: NetworkDataService,
              private router: Router ){ }

  ngOnInit() {
  }

  addNewFunctionSet() {

    // add function component to dom and service array
    this.functionCount += 1;
    const myResolver = this.resolver.resolveComponentFactory(NetworkFunctionComponent);
    const pinRef = this.functionContainer.createComponent(myResolver);
    pinRef.instance.functionSetId = this.functionCount;

    this.networkDataService.functionSetArray.push(pinRef);

    console.log(this.networkDataService.functionSetArray);
    console.log(this.functionCount);
  }

  addFunctions() {
    // get functions details
    for(let function_ of this.networkDataService.functionSetArray){
      if(function_ != null){
        this.networkDataService.getNetworkFunctionData(
          {
            "microcontrollerType":function_.instance.microcontrollerType,
            "includesFunction":function_.instance.includesFunction,
            "clientGlobalVariableFunction":function_.instance.clientGlobalVariableFunction,
            "serverGlobalVariableFunction":function_.instance.serverGlobalVariableFunction,
            "clientSetupFunction":function_.instance.clientSetupFunction,
            "serverSetupFunction":function_.instance.serverSetupFunction,
            "connectingFunction":function_.instance.connectingFunction,
            "disconnectingFunction":function_.instance.disconnectingFunction,
            "dataSendingFunction":function_.instance.dataSendingFunction,
            "dataReceivingFunction":function_.instance.dataReceivingFunction,
            "helperFunction":function_.instance.helperFunction
          }
        );
      }
    }
    console.log(this.networkDataService.networkFunctionData);

    // TODO : Make common data format to sensor and send to backend (make function in service)
    this.networkDataService.addNetworkDeviceToBackend();

    this.router.navigateByUrl('/add-network/basic');
  }

}
