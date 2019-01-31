import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ContainerComponent } from "./container/container.component";
import { SharedService } from "../shared/shared.service";
@Injectable()
export class SensorNodeService {
  // TODO : Using HTTP calls load data to sensors, microcontrollers and sensor nodes

  private configuration;
  

  prepareSensorNodeData() {
    return {
      doc: null,
      name: this.sensorNodeHelperData[this.sensorNodeHelperData.length - 1]
        .sensorNodeName,
      type: this.sensorNodeHelperData[this.sensorNodeHelperData.length - 1]
        .sensorNodeType,
      interval: this.sensorNodeHelperData[this.sensorNodeHelperData.length - 1]
        .dataSendingInterval,
      internet_ssid: this.sensorNodeHelperData[
        this.sensorNodeHelperData.length - 1
      ].SSID,
      internet_password: this.sensorNodeHelperData[
        this.sensorNodeHelperData.length - 1
      ].SSIDPassword,
      configuration: this.configuration.toString(),
      description: this.sensorNodeHelperData[
        this.sensorNodeHelperData.length - 1
      ].sensorNodeDescription,
      communication_method: this.prepareCommunicationMethod(
        this.sensorNodeHelperData[this.sensorNodeHelperData.length - 1]
          .sensorNodeCommunicationMethod
      )
    };
  }

  prepareCommunicationMethod(modelName: string) {
    console.log(modelName);
    for (let comm of this.communicationTypes) {
      console.log(comm.communicationType + ">>>>" + modelName);
      if (comm.communicationType == modelName) {
        console.log(comm.communicationId);
        return comm.communicationId;
      }
    }
    return null;
  }

  addSensorNodeToBackend() {
    let sensorNode = this.prepareSensorNodeData();
    console.log(sensorNode);

    this.http
      .post(this.sharedService.backendURL+"/sensornode", sensorNode)
      .subscribe(
        response => {
          console.log(response);
          alert("Sensor-node Added Successfully");
        },
        error => console.log(error)
      );
  }

  addSensorNodeConfiguration(pinConfig) {
    this.configuration = pinConfig;
  }

  communicationTypes = [];

  getCommunicationTypesFromBackend() {
    return this.http.get(this.sharedService.backendURL+"/communication");
  }

  addCommunicationFromBackend(comm: any) {
    this.communicationTypes.push({
      communicationType: comm.model_name,
      communicationId: comm.id
    });
  }

  constructor(private http: Http, private sharedService: SharedService) {}

  // sensors array
  sensors = [
    // {"sensorDisplayName": 'DH 11', 'sensorDescription': 'DHT11 : is a basic, ultra low-cost digital temperature and humidity sensor. It uses a capacitive humidity sensor and a thermistor', 'sensorId':'SEN_1'},
    // {"sensorDisplayName": 'TMP 36', 'sensorDescription': 'TMP36 : low voltage, precision centigrade temperature sensor and doesn’t require any external calibration .', 'sensorId':'SEN_2'},
    // // {"sensorDisplayName": 'DS18B20', 'sensorDescription': 'Digital temperature sensor : measure temperature (C) with 9 to 12-bit precision, -55C to 125C (+/-0.5C).', 'sensorId':'SEN003'},
    // {"sensorDisplayName": 'HC-SR501', 'sensorDescription': 'The SR501 will detect infrared changes and if interpreted as motion. The device will detect motion inside a 110 degree cone with a range of 3 to 7 meters.', 'sensorId':'SEN_4'},
    // {"sensorDisplayName": 'DS18B20', 'sensorDescription': 'Digital temperature sensor : measure temperature (C) with 9 to 12-bit precision, -55C to 125C (+/-0.5C).', 'sensorId':'SEN_3'},
  ];

  microcontrollers = [
    // {"microcontrollerDisplayName": 'ESP 8266', 'microcontrollerDescription': 'Microcontroller that has inbuilt Wi-Fi capabilities and extremely cost effective board',
    //   'microcontrollerId':'MIC_1'},
    // {"microcontrollerDisplayName": 'Raspberry Pi', 'microcontrollerDescription': 'Python based microcontroller',
    //   'microcontrollerId':'MIC002'}
  ];

  sensorNodes = [
    // {"sensorNodeDisplayName": 'Node A', 'sensorNodeDescription': 'Custom sensor node A', 'sensorNodeId':'NOD_1'},
    // {"sensorNodeDisplayName": 'Node B', 'sensorNodeDescription': 'Custom sensor node B', 'sensorNodeId':'NOD_2'}
  ];

  addSensorFromBackend(sensor: any) {
    this.sensors.push({
      sensorDisplayName: sensor.display_name,
      sensorDescription: sensor.description,
      sensorId: "SEN_" + sensor.id
    });
  }

  addMicrocontrollerFromBackend(microcontroller: any) {
    this.microcontrollers.push({
      microcontrollerDisplayName: microcontroller.display_name,
      microcontrollerDescription: microcontroller.description,
      microcontrollerId: "MIC_" + microcontroller.id
    });
  }

  addSensorNodeFromBackend(sensorNode: any) {
    this.sensorNodes.push({
      sensorNodeDisplayName: sensorNode.name,
      sensorNodeDescription: sensorNode.description,
      sensorNodeId: "NOD_" + sensorNode.id
    });
  }

  getMicrocontrollersFromBackend() {
    return this.http.get(this.sharedService.backendURL+"/microcontroller");
  }

  getSensorsFromBackend() {
    return this.http.get(this.sharedService.backendURL+"/sensors");
  }

  getSensorNodesFromBackend() {
    return this.http.get(this.sharedService.backendURL+"/sensornode");
  }

  //sensor node helper data
  sensorNodeHelperData = [];

  //Sensor node container data
  sensorNodeContainer = [];

  getSensorNodeContainerData(object: any) {
    this.sensorNodeContainer.push(object);
  }

  getSensors() {
    return this.sensors;
  }

  getMicrocontrollers() {
    return this.microcontrollers;
  }

  getSensorNodes() {
    return this.sensorNodes;
  }

  getSensorNodeHelperData(object: any) {
    console.log(object);
    this.sensorNodeHelperData.push({
      SSID: object.SSID,
      SSIDPassword: object.SSIDPassword,
      dataSendingInterval: object.dataSendingInterval,
      sensorNodeDescription: object.sensorNodeDescription,
      sensorNodeName: object.sensorNodeName,
      sensorNodeType: object.sensorNodeType,
      sensorNodeCommunicationMethod: object.sensorNodeCommunicationMethod
    });
  }

  getSensorNodeColor(nodeId: string) {
    if (nodeId.substring(0, 3) == "SEN") return "#16ab39";
    else if (nodeId.substring(0, 3) == "MIC") return "#1678c2";
    else return "#cf590c";
  }

  getSensorNodeName(nodeId: string) {
    if (nodeId.substring(0, 3) == "SEN")
      for (let sensor of this.sensors) {
        if (sensor.sensorId == nodeId) return sensor.sensorDisplayName;
      }
    else if (nodeId.substring(0, 3) == "MIC")
      for (let microcontroller of this.microcontrollers) {
        if (microcontroller.microcontrollerId == nodeId)
          return microcontroller.microcontrollerDisplayName;
      }
    else
      for (let sensorNode of this.sensorNodes) {
        if (sensorNode.sensorNodeId == nodeId)
          return sensorNode.sensorNodeDisplayName;
      }
  }

  // Power usage handle

  //power values

  expandSensorDetail() {}

  deleteSensor(sensorId) {
    console.log(sensorId);
    return this.http.delete(this.sharedService.backendURL+"/sensors/" + sensorId);
  }
  deleteMicrocontroller(microcontrollerId) {
    console.log(microcontrollerId);
    return this.http.delete(
      this.sharedService.backendURL+"/microcontroller/" + microcontrollerId
    );
  }
  deleteSensorNode(sensorNodeId) {
    return this.http.delete(
      this.sharedService.backendURL+"/sensornode/" + sensorNodeId
    );
  }
  getCommunicationMethods() {
    return this.http.get(this.sharedService.backendURL+"/communication/");
  }
}
