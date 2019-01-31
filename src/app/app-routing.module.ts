import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from "./about-us/about-us.component";
import { SensorNodeMainComponent } from "./sensor-node/sensor-node-main.component";
import { SensorComponent } from "./sensor/sensor.component";
import { PinGonfigsComponent } from "./sensor/pin-gonfigs/pin-gonfigs.component";
import { BasicDataComponent } from "./sensor/basic-data/basic-data.component";
import { FunctionsComponent } from "./sensor/functions/functions.component";
import { NetworkComponent } from "./network/network.component";
import { BasicNetworkDataComponent } from "./network/basic-network-data/basic-network-data.component";
import { NetworkPinConfigsComponent } from "./network/network-pin-configs/network-pin-configs.component";
import { NetworkFunctionsComponent } from "./network/network-functions/network-functions.component";
import { MicrocontrollerMainComponent } from "./microcontroller-main/microcontroller-main.component";
import { BasicMicroDataComponent } from "./microcontroller-main/basic-micro-data/basic-micro-data.component";
import { MicroPinCongigsComponent } from "./microcontroller-main/micro-pin-congigs/micro-pin-congigs.component";
import { MicroFunctionsComponent } from "./microcontroller-main/micro-functions/micro-functions.component";
import { NetworkConfigComponent } from "./network-config/network-config.component";
import { CodeDownloadComponent } from "./code-download/code-download.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthGuard } from "./shared/auth.guard";
import { LoggedAuthGuard } from "./shared/logged-auth.guard";
import { RoleGuard } from "./shared/role.guard";
import { from } from "rxjs";
const appRoutes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    component: HomePageComponent,
    canActivate: [LoggedAuthGuard]
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [LoggedAuthGuard]
  },
  {
    path: "sensor-node",
    component: SensorNodeMainComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "network-config",
    component: NetworkConfigComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "add-sensor",
    component: SensorComponent,
    children: [
      {
        path: "basic",
        component: BasicDataComponent,
        canActivate: [RoleGuard]
      },
      { path: "pin", component: PinGonfigsComponent },
      { path: "function", component: FunctionsComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "add-network",
    component: NetworkComponent,
    children: [
      {
        path: "basic",
        component: BasicNetworkDataComponent,
        canActivate: [RoleGuard]
      },
      { path: "pin", component: NetworkPinConfigsComponent },
      { path: "function", component: NetworkFunctionsComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "add-microcontroller",
    component: MicrocontrollerMainComponent,
    children: [
      {
        path: "basic",
        component: BasicMicroDataComponent,
        canActivate: [RoleGuard]
      },
      { path: "pin", component: MicroPinCongigsComponent },
      { path: "function", component: MicroFunctionsComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "code-download",
    component: CodeDownloadComponent,
    canActivate: [AuthGuard]
  },
  { path: "about", component: AboutUsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
