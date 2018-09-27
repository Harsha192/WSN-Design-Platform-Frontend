import { Component, OnInit, Input, Output } from '@angular/core';
import {NetworkDataService} from "../../network-data.service";

@Component({
  selector: 'app-network-function',
  templateUrl: './network-function.component.html',
  styleUrls: ['./network-function.component.css']
})
export class NetworkFunctionComponent implements OnInit {

  @Input() functionSetId = null
  @Output() microcontrollerType = '';
  @Output() clientGlobalVariableFunction = '';
  @Output() serverGlobalVariableFunction = '';
  @Output() includesFunction = '';
  @Output() clientSetupFunction = '';
  @Output() serverSetupFunction = '';
  @Output() connectingFunction = '';
  @Output() disconnectingFunction ='';
  @Output() dataSendingFunction = '';
  @Output() dataReceivingFunction = '';
  @Output() helperFunction = '';

  constructor(private networkDataService: NetworkDataService) { }

  ngOnInit() {
  }

  updateMicrocontrollerType (event: Event) {
    this.microcontrollerType = (<HTMLInputElement>event.target).value;
  }

  updateIncludesFunction (event: Event) {
    this.includesFunction = (<HTMLInputElement>event.target).value;
  }

  updateClientGlobalVariableFunction (event: Event) {
    this.clientGlobalVariableFunction = (<HTMLInputElement>event.target).value;
  }

  updateServerGlobalVariableFunction (event: Event) {
    this.serverGlobalVariableFunction = (<HTMLInputElement>event.target).value;
  }

  updateServerSetupFunction (event: Event) {
    this.serverSetupFunction = (<HTMLInputElement>event.target).value;
  }

  updateClientSetupFunction (event: Event) {
    this.clientSetupFunction = (<HTMLInputElement>event.target).value;
  }

  updateConnectingFunction (event: Event) {
    this.connectingFunction = (<HTMLInputElement>event.target).value;
  }

  updateDisconnectingFunction (event: Event) {
    this.disconnectingFunction = (<HTMLInputElement>event.target).value;
  }

  updateDataSendingFunction (event: Event) {
    this.dataSendingFunction = (<HTMLInputElement>event.target).value;
  }

  updateDataReceivingFunction (event: Event) {
    this.dataReceivingFunction = (<HTMLInputElement>event.target).value;
  }

  updateHelperFunction (event: Event) {
    this.helperFunction = (<HTMLInputElement>event.target).value;
  }

  onDelete() {
    console.log(this.functionSetId-1);
    this.networkDataService.functionSetArray[this.functionSetId-1].destroy();
    this.networkDataService.functionSetArray[this.functionSetId-1] = null;
    console.log( this.networkDataService.functionSetArray);
  }

}
