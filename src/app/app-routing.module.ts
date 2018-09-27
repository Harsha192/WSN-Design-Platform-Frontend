import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutUsComponent} from './about-us/about-us.component'
import {SensorNodeMainComponent} from './sensor-node/sensor-node-main.component'
import {SensorComponent} from './sensor/sensor.component'
import {PinGonfigsComponent} from './sensor/pin-gonfigs/pin-gonfigs.component'
import {BasicDataComponent} from './sensor/basic-data/basic-data.component'
import {FunctionsComponent} from './sensor/functions/functions.component'
import {NetworkComponent} from './network/network.component'
import {BasicNetworkDataComponent} from './network/basic-network-data/basic-network-data.component'
import {NetworkPinConfigsComponent} from './network/network-pin-configs/network-pin-configs.component'
import {NetworkFunctionsComponent} from './network/network-functions/network-functions.component'
import {MicrocontrollerMainComponent} from './microcontroller-main/microcontroller-main.component'
import {BasicMicroDataComponent} from './microcontroller-main/basic-micro-data/basic-micro-data.component'
import {MicroPinCongigsComponent} from './microcontroller-main/micro-pin-congigs/micro-pin-congigs.component'
import {MicroFunctionsComponent} from './microcontroller-main/micro-functions/micro-functions.component'
import {NetworkConfigComponent} from './network-config/network-config.component'
import { CodeDownloadComponent } from './code-download/code-download.component'


const appRoutes: Routes = [
  {path: '', redirectTo: '/sensor-node', pathMatch: 'full'},

  {path: 'sensor-node', component: SensorNodeMainComponent},

  {path: 'network-config', component: NetworkConfigComponent},

  {path: 'add-sensor', component: SensorComponent, children:[
    {path: 'basic', component: BasicDataComponent },
    {path: 'pin', component: PinGonfigsComponent },
    {path: 'function', component: FunctionsComponent }
  ]},
  {path: 'add-network', component: NetworkComponent, children:[
    {path: 'basic', component: BasicNetworkDataComponent },
    {path: 'pin', component: NetworkPinConfigsComponent },
    {path: 'function', component: NetworkFunctionsComponent }
  ]},
  {path:'add-microcontroller', component:MicrocontrollerMainComponent, children:[
    {path:'basic', component: BasicMicroDataComponent},
    {path:'pin', component: MicroPinCongigsComponent},
    {path:'function', component: MicroFunctionsComponent}
  ]},
  {path: 'code-download', component: CodeDownloadComponent},
  {path: 'about', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
