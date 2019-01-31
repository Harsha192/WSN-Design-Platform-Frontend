import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared/shared.service";
import { Http, ResponseContentType } from "@angular/http";
import "rxjs/add/operator/map";

@Component({
  selector: "app-code-download",
  templateUrl: "./code-download.component.html",
  styleUrls: ["./code-download.component.css"]
})
export class CodeDownloadComponent implements OnInit {
  public nodes = [
    // 'nodeA', 'NodeB'
  ];

  constructor(private sharedService: SharedService, private http: Http) {}

  ngOnInit() {
    this.nodes = this.sharedService.addNodes;
    console.log(this.nodes);
  }

  downloadCode(node) {
    this.http
      .get(this.sharedService.backendURL+ "/Firmware", {
        responseType: ResponseContentType.Blob
      })
      .map(res => {
        return {
          filename: `${node}.ino`,
          data: res.blob()
        };
      })
      .subscribe(
        res => {
          console.log(res);
          console.log("start download:", res);
          var url = window.URL.createObjectURL(res.data);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.href = url;
          a.download = res.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        },
        error => {}
      );
  }
}
