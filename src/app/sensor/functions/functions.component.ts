import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {sensorDataService} from "../senser-data.service";
import {FunctionComponent} from "./function/function.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {

  @ViewChild('functionContainer', {read: ViewContainerRef}) functionContainer;
  private functionCount :number = 0;

  constructor(private resolver: ComponentFactoryResolver, private sensorService: sensorDataService,
              private router: Router) { }

  ngOnInit() {
  }

  addNewFunctionSet() {

    // add function component to dom and service array
    this.functionCount += 1;
    const myResolver = this.resolver.resolveComponentFactory(FunctionComponent);
    const pinRef = this.functionContainer.createComponent(myResolver);
    pinRef.instance.functionSetId = this.functionCount;

    this.sensorService.functionSetArray.push(pinRef);

    // console.log(this.sensorService.functionSetArray);
    // console.log(this.functionCount);
  }

  addFunctions() {
    // get functions details
    for(let function_ of this.sensorService.functionSetArray){
      if(function_ != null){
        //console.log('instance  '+function_.instance.microcontrollerType);
        this.sensorService.getSensorFunctionData(
            {
              "microcontrollerType":function_.instance.microcontrollerType,
              "headerFiles":function_.instance.headerFiles,
              "GlobalVariables":function_.instance.GlobalVariables,
              "initializeFunction":function_.instance.initializeFunction,
              "readingFunction":function_.instance.readingFunction
            }
          );
      }
    }
    this.sensorService.sensorFunctionData.forEach(element => {
      console.log('sensorFunctionData  '+element.microcontrollerType);
    });
    //console.log('sensorFunctionData  '+this.sensorService.sensorFunctionData);

    // TODO : Make common data format to sensor and send to backend
    this.sensorService.addSensorToBackend();

    this.router.navigateByUrl('/add-sensor/basic');
  }

}
