import { Component, OnInit } from '@angular/core';
import {ContainerComponent} from "../container/container.component";
import '../../../../node_modules/chart.js/dist/Chart.js'

declare let Chart: any;

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.css']
})
export class PowerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // setInterval(this.dataUpdate,1000);
    this.dataUpdate();


    let myLineChart = new Chart(this.canvas,{
      type:'line',
      data:this.data,
      options:this.option
    });
  }



  // Pie
  // public  lineChartLabels:string[] = [ '1','2','3'];
  // public lineChartData:number[] = [1.4, 2.6, 3.3];

  dataUpdate () {

    this.lineChartData = [561, 627, 692];
    this.lineChartLabels = [ '1','2','3'];
    this.lineChartData1 = ContainerComponent.powerLevels;
    console.log(this.lineChartData);
  }


  public lineChartData:number[] ;
  public  lineChartLabels:string[];
  public lineChartData1:number[] ;


  public lineChartType:string = 'line';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  addDummy() {
    let tempData = this.lineChartData;
    let tempLables = this.lineChartLabels;

    tempData.push(Number((Math.random()*5).toFixed(2)));
    tempLables.push(String(this.lineChartData.length +1));

    this.lineChartData = tempData;
    this.lineChartLabels = tempLables;

    console.log(this.lineChartData)
  }

  canvas = document.getElementById('myChart');
  data = {
  labels: ["1", "2", "3"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      data: [1.2, 2.4, 3.1],
    }
  ]
};


  option = {
  showLines: true
};







}
