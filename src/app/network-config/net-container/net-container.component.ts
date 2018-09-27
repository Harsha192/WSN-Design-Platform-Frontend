import { Component, OnInit } from '@angular/core';
import {NetworkConfigService} from "../network-config.service";
declare var jQuery: any;
declare var d3: any;

@Component({
  selector: 'app-net-container',
  templateUrl: './net-container.component.html',
  styleUrls: ['./net-container.component.css']
})
export class NetContainerComponent implements OnInit {

  public static myCanvas;
  public static nodes =[];

  constructor(private netConfigService: NetworkConfigService) { }

  ngOnInit() {
    NetContainerComponent.myCanvas = d3.select("#net-container")
      .append("svg")
      .attr("width", 750)
      .attr("height", 580)
      .style("background-color", d3.rgb("#e9eeea"))
      .style("border", "1px solid black")
      .style("border-radius","6px")
      .append("g");
  }

  // Allow Drop Function
  allowDrop(event: any) {
    event.preventDefault();
  }

  // Drop Function
  dropEv(event: any) {
    event.preventDefault();
    let nodeId: string = event.dataTransfer.getData("content");
    let nodeColor: string = "#cf590c";
    let nodeName: string = this.netConfigService.getSensorNodeName(nodeId);

    //TODO : implement validation on here  (call function) -> push valid nodes to array in sensor-node service

    this.netConfigService.getNetworkContainerData({"ID": nodeId});
    NetContainerComponent.nodes.push(nodeName);

    this.addElementToCanvas({"id":nodeId, "color":nodeColor, "name":nodeName},event);

    if(this.netConfigService.isBaseStation(nodeId)){
      NetworkConfigService.baseStation.push(nodeId.substring(4));
    }

  }

  // Add elements to Canvas (SVG)
  addElementToCanvas (data:object, event:any) {

    let node = NetContainerComponent.myCanvas.append("svg:g")
      .data([{"x": event.clientX - 600, "y": event.clientY - 90, "data": data}])
      .on("drag",null);

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
      .attr("x",event.clientX-400)
      .attr("y",event.clientY-70)
      .attr("width", 200)
      .attr("height", 35)
      .attr("fill", function (d) {
        return d3.rgb(d.data.color);
      });

    // add text to node
    node
      .append("text")
      .attr("x", event.clientX-400 + 70)
      .attr("y", event.clientY-70 + 20)
      .text(function (d) {
        return d.data.name;
      })
      .attr("fill",d3.rgb("#fff"))
      .attr("style","font-weight:bold");

    // add connecting point to node and add draw line functionality
    node
      .append("rect")
      .attr("id", function (d) {
        return d.data.id;
      })
      .attr("x", event.clientX-400 - 5)
      .attr("y", event.clientY-70 + 13)
      .attr("width", 10)
      .attr("height", 10)
      .attr("rx", 3)
      .attr("style", "  stroke: #999;stroke-width: 1;fill: #ddd;cursor: crosshair;")
      .call(this.draw_line);
  }

  draw_line = d3.behavior.drag().on("dragstart", function (d) {

    // Starting drawing line
    NetContainerComponent.myCanvas
      .append("line")
      .attr("id", function () {
        NetworkConfigService.lineId++;
        return 'line_' + NetworkConfigService.lineId;
      })
      .attr("x1", d3.mouse(this)[0])
      .attr("y1", d3.mouse(this)[1])
      .attr("x2", d3.mouse(this)[0])
      .attr("y2", d3.mouse(this)[1])
      .datum({"startId": d3.event.sourceEvent.toElement.id})
      .attr("stroke", d3.rgb("#B2BEB5"))
      .attr("stroke-width", 4);
  })
    .on("dragend", function (d) {

      // finish line
      NetContainerComponent.myCanvas.select('#line_'+ NetworkConfigService.lineId )
        .attr("x2", d3.mouse(this)[0])
        .attr("y2", d3.mouse(this)[1]);

      //Register created Links
      let startID = NetContainerComponent.myCanvas.select('#line_'+ NetworkConfigService.lineId ).datum().startId;
      let endID = d3.event.sourceEvent.target.id;
      NetworkConfigService.links.push(
        {"source":startID.substring(4), "target":endID.substring(4)}
      );
      console.log(NetworkConfigService.links);
    });

}
