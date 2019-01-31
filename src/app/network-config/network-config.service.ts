import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { SharedService } from "../shared/shared.service";
@Injectable()
export class NetworkConfigService {
  constructor(
    private http: Http,
    private router: Router,
    private sharedService: SharedService
  ) {}

  sensorNodes = [
    // {"sensorNodeDisplayName": 'Node A', 'sensorNodeDescription': 'Custom sensor node A', 'sensorNodeId':'NOD_001',
    //   'sensorNodeType':'gateway'},
    // {"sensorNodeDisplayName": 'Node B', 'sensorNodeDescription': 'Custom sensor node B', 'sensorNodeId':'NOD_002',
    //  'sensorNodeType':'node'}
  ];

  public static lineId: number = 0;
  public static links = [];
  public static baseStation = [];

  prepareNetworkConfigData() {
    return {
      display_name: this.networkHelperData[this.networkHelperData.length - 1]
        .NetworkName,
      description: this.networkHelperData[this.networkHelperData.length - 1]
        .networkDescription,
      average_distance: this.networkHelperData[
        this.networkHelperData.length - 1
      ].maximumDistance,
      configuration: this.prepareNetworkConfiguration()
    };
  }

  addNetworkConfigToBackend() {
    let networkConfig = this.prepareNetworkConfigData();
    console.log(networkConfig);
    // this.http.post('http://localhost:8090/sensornetwork', networkConfig).subscribe(
    //   (response) => {console.log(response); alert('Sensor-node Added Successfully');},
    //   (error) => console.log(error)
    // );
  }

  getSensorNodeFromBackend() {
    return this.http.get(this.sharedService.backendURL + "/sensornode");
  }

  addSensorNodeFromBackend(sensorNode: any) {
    this.sensorNodes.push({
      sensorNodeDisplayName: sensorNode.name,
      sensorNodeDescription: sensorNode.description,
      sensorNodeId: "NOD_" + sensorNode.id,
      sensorNodeType: sensorNode.type
    });
  }

  isBaseStation(id: string) {
    for (let sensorNode of this.sensorNodes) {
      if (
        sensorNode.sensorNodeType == "gateway" &&
        sensorNode.sensorNodeId == id
      ) {
        return true;
      }
    }
    return false;
  }

  prepareNetworkConfiguration() {
    let net_map = NetworkConfigService.baseStation;

    for (let i = 0; i < NetworkConfigService.links.length; i++) {
      for (let j = 0; j < NetworkConfigService.baseStation.length; j++) {
        let temp = net_map[j];

        if (
          NetworkConfigService.links[i].source ==
          NetworkConfigService.baseStation[j]
        ) {
          temp += "," + NetworkConfigService.links[i].target;
          net_map[j] = temp;
          break;
        }
        if (
          NetworkConfigService.links[i].target ==
          NetworkConfigService.baseStation[j]
        ) {
          temp += "," + NetworkConfigService.links[i].source;
          net_map[j] = temp;
          break;
        }
      }
    }

    let configuration = net_map[0];
    if (net_map.length > 1) {
      for (let i = 1; i < net_map.length - 1; i++) {
        configuration += "-" + net_map[i];
      }
      configuration += "-" + net_map[net_map.length - 1];
    }
    return configuration;
  }

  getSensorNodes() {
    return this.sensorNodes;
  }

  //network helper data
  networkHelperData = [];

  getNetworkHelperData(object: any) {
    this.networkHelperData.push({
      NetworkName: object.NetworkName,
      maximumDistance: object.maximumDistance,
      networkDescription: object.networkDescription
    });
  }

  getSensorNodeName(nodeId: string) {
    if (nodeId.substring(0, 3) == "NOD") {
      for (let sensorNode of this.sensorNodes) {
        if (sensorNode.sensorNodeId == nodeId)
          return sensorNode.sensorNodeDisplayName;
      }
    }
  }

  //Sensor node container data
  networkContainer = [];

  getNetworkContainerData(object: any) {
    this.networkContainer.push(object);
  }

  createNetwork() {
    console.log(this.prepareNetworkConfiguration());
  }
}
