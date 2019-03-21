import { Component, OnInit } from "@angular/core";
import { SensorNodeService } from "../sensor-node.service";
import { Http } from "@angular/http";
import { SharedService } from "../../shared/shared.service";
declare var jQuery: any;
declare var d3: any;

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"]
})
export class ContainerComponent implements OnInit {
  public static myCanvas;
  private static lineId: number = 0;
  private static links = [];
  public static nodes = [];
  public static powerLevels = [];
  public static powerNumber = [];

  private static first: boolean = true;
  private static userId: number;

  constructor(
    private sensorNodeService: SensorNodeService,
    private http: Http,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    ContainerComponent.myCanvas = d3
      .select("#svg-container")
      .append("svg")
      .attr("width", 750)
      .attr("height", 860)
      .style("background-color", d3.rgb("#e9eeea"))
      .style("border", "1px solid black")
      .style("border-radius", "6px")
      .append("g");
  }

  // Allow Drop Function
  allowDrop(event: any) {
    event.preventDefault();
  }

  // Drop Function
  //  dropEv(event: any) {
  dropEv(event: any, cb) {
    event.preventDefault();
    let nodeId: string = event.dataTransfer.getData("content");
    let nodeColor: string = this.sensorNodeService.getSensorNodeColor(nodeId);
    let nodeName: string = this.sensorNodeService.getSensorNodeName(nodeId);

    //TODO : implement validation on here  (call function) -> push valid nodes to array in sensor-node service

    this.sensorNodeService.getSensorNodeContainerData({ ID: nodeId });

    cb({ id: nodeId, color: nodeColor, name: nodeName }, event);

    // if(this.sensorNodeService.sensorNodeContainer.length> 5){
    //   alert('Microcontroller power limit exceeded ');
    // }else {
    //   this.addElementToCanvas({"id":nodeId, "color":nodeColor, "name":nodeName},event);
    // }
    //
    // this.addElementToCanvas({"id":nodeId, "color":nodeColor, "name":nodeName},event);
  }

  // validate Nodes
  validateNodes(data: any, event: any) {
    //create nodes configuration for validation method
    let config;
    if (ContainerComponent.nodes.length > 0) {
      config = ContainerComponent.nodes
        .toString()
        .concat(",", data.id.substr(4));
    } else {
      config = data.id.substr(4);
    }

    // #TODO communication method
    // creating object to send validation class
    let obj = {
      code: 200,
      error_description: null,
      model_name: "Sensor node",
      communication_method: "",

      config_diagram: config
    };

    if (ContainerComponent.first) {
      obj["id"] = 0;
      obj["node_power"] = "";
      ContainerComponent.first = false;
    } else {
      obj["id"] = ContainerComponent.userId;
      obj["node_power"] =
        ContainerComponent.powerLevels[
        ContainerComponent.powerLevels.length - 1
        ];
    }

    jQuery.ajax({
      type: "POST",
      url: "http://192.168.8.100:8090/validation",
      contentType: "application/json",
      data: JSON.stringify(obj),
      success: res => {
        if (res.code == 200) {
          ContainerComponent.userId = res.id;
          ContainerComponent.powerLevels.push(res.node_power);
          ContainerComponent.addElementToCanvas(data, event);
        } else {
          alert(res.error_description);
        }
      }
    });
  }

  static draw_line = d3.behavior
    .drag()
    .on("dragstart", function (d) {
      console.log("draw line" + d3.event.sourceEvent);
      // Starting drawing line
      ContainerComponent.myCanvas
        .append("line")
        .attr("id", function () {
          ContainerComponent.lineId++;
          return "line_" + ContainerComponent.lineId;
        })
        .attr("x1", d3.mouse(this)[0])
        .attr("y1", d3.mouse(this)[1])
        .attr("x2", d3.mouse(this)[0])
        .attr("y2", d3.mouse(this)[1])
        .datum({ startId: d3.event.sourceEvent.toElement.id })
        .attr("stroke", d3.rgb("#B2BEB5"))
        .attr("stroke-width", 4);
    })
    .on("dragend", function (d) {
      // finish line
      ContainerComponent.myCanvas
        .select("#line_" + ContainerComponent.lineId)
        .attr("x2", d3.mouse(this)[0])
        .attr("y2", d3.mouse(this)[1]);

      //Register created Links
      let startID = ContainerComponent.myCanvas
        .select("#line_" + ContainerComponent.lineId)
        .datum().startId;
      let endID = d3.event.sourceEvent.target.id;
      ContainerComponent.links.push({ source: startID, target: endID });
      console.log(ContainerComponent.links);
    });

  // Add elements to Canvas (SVG)
  static addElementToCanvas(data: any, event: any) {
    ContainerComponent.nodes.push(data.id.substring(4));

    let node = ContainerComponent.myCanvas
      .append("svg:g")
      .data([{ x: event.clientX - 600, y: event.clientY - 90, data: data }])
      .on("drag", null);

    // draw main square
    node
      .append("rect")
      .attr("id", function (d) {
        return d.data.id;
      })
      .attr("class", "button_size")
      .attr("rx", 4)
      .attr("stroke-width", 1)
      .attr("stroke", d3.rgb("#999"))
      .attr("x", event.clientX - 400)
      .attr("y", event.clientY - 70)
      .attr("width", 200)
      .attr("height", 35)
      .attr("fill", function (d) {
        return d3.rgb(d.data.color);
      });

    // add text to node
    node
      .append("text")
      .attr("x", event.clientX - 400 + 70)
      .attr("y", event.clientY - 70 + 20)
      .text(function (d) {
        return d.data.name;
      })
      .attr("fill", d3.rgb("#fff"))
      .attr("style", "font-weight:bold");

    // add connecting point to node and add draw line functionality
    node
      .append("rect")
      .attr("id", function (d) {
        return d.data.id;
      })
      .attr("x", event.clientX - 400 - 5)
      .attr("y", event.clientY - 70 + 13)
      .attr("width", 10)
      .attr("height", 10)
      .attr("rx", 3)
      .attr(
        "style",
        "  stroke: #999;stroke-width: 1;fill: #ddd;cursor: crosshair;"
      )
      .call(ContainerComponent.draw_line);
  }
}
