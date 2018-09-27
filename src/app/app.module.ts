import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";

import { HeaderComponent } from "./header/header.component";

import { AboutUsComponent } from "./about-us/about-us.component";

import { SensorComponent } from "./sensor/sensor.component";
import { BasicDataComponent } from "./sensor/basic-data/basic-data.component";
import { PinGonfigsComponent } from "./sensor/pin-gonfigs/pin-gonfigs.component";
import { PinConfigComponent } from "./sensor/pin-gonfigs/pin-config/pin-config.component";
import { FunctionsComponent } from "./sensor/functions/functions.component";
import { FunctionComponent } from "./sensor/functions/function/function.component";

import { SensorNodeMainComponent } from "./sensor-node/sensor-node-main.component";
import { SideBarComponent } from "./sensor-node/side-bar/side-bar.component";
import { MicrocontrollerComponent } from "./sensor-node/side-bar/microcontroller/microcontroller.component";
import { SensorNodeComponent } from "./sensor-node/side-bar/sensor-node/sensor-node.component";
import { SensorSidebarComponent } from "./sensor-node/side-bar/sensor/sensor.component";
import { ContainerComponent } from "./sensor-node/container/container.component";
import { HelperMenuComponent } from "./sensor-node/helper-menu/helper-menu.component";
import { NetworkComponent } from "./network/network.component";
import { BasicNetworkDataComponent } from "./network/basic-network-data/basic-network-data.component";
import { NetworkPinConfigsComponent } from "./network/network-pin-configs/network-pin-configs.component";
import { NetworkPinConfigComponent } from "./network/network-pin-configs/network-pin-config/network-pin-config.component";
import { NetworkFunctionsComponent } from "./network/network-functions/network-functions.component";
import { NetworkFunctionComponent } from "./network/network-functions/network-function/network-function.component";
import { MicrocontrollerMainComponent } from "./microcontroller-main/microcontroller-main.component";
import { BasicMicroDataComponent } from "./microcontroller-main/basic-micro-data/basic-micro-data.component";
import { MicroPinCongigsComponent } from "./microcontroller-main/micro-pin-congigs/micro-pin-congigs.component";
import { MicroPinConfigComponent } from "./microcontroller-main/micro-pin-congigs/micro-pin-config/micro-pin-config.component";
import { MicroFunctionsComponent } from "./microcontroller-main/micro-functions/micro-functions.component";
import { NetworkConfigComponent } from "./network-config/network-config.component";
import { NetContainerComponent } from "./network-config/net-container/net-container.component";
import { NetHelperMenuComponent } from "./network-config/net-helper-menu/net-helper-menu.component";
import { NetSideBarComponent } from "./network-config/net-side-bar/net-side-bar.component";
import { NetSensorNodeComponent } from "./network-config/net-side-bar/net-sensor-node/net-sensor-node.component";
import { CodeDownloadComponent } from "./code-download/code-download.component";
import { HttpModule } from "@angular/http";
import { PowerComponent } from "./sensor-node/power/power.component";
import { ChartsModule } from "ng2-charts";
import { SharedService } from "./shared/shared.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,

    AboutUsComponent,

    SensorNodeMainComponent,
    SideBarComponent,
    MicrocontrollerComponent,
    SensorNodeComponent,
    SensorSidebarComponent,

    SensorComponent,
    BasicDataComponent,
    PinGonfigsComponent,
    PinConfigComponent,
    FunctionsComponent,
    FunctionComponent,
    ContainerComponent,
    HelperMenuComponent,

    NetworkComponent,
    BasicNetworkDataComponent,
    NetworkPinConfigsComponent,
    NetworkPinConfigComponent,
    NetworkFunctionsComponent,
    NetworkFunctionComponent,
    MicrocontrollerMainComponent,
    BasicMicroDataComponent,
    MicroPinCongigsComponent,
    MicroPinConfigComponent,
    MicroFunctionsComponent,
    NetworkConfigComponent,
    NetContainerComponent,
    NetHelperMenuComponent,
    NetSideBarComponent,
    NetSensorNodeComponent,
    CodeDownloadComponent,
    PowerComponent
  ],
  entryComponents: [
    PinConfigComponent,
    FunctionComponent,
    NetworkPinConfigComponent,
    NetworkFunctionComponent,
    MicroPinConfigComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    ChartsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {}
