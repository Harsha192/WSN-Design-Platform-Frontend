import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() {
    jQuery('.ui.image').popup();
  }

  ngOnInit() {
  }



}
