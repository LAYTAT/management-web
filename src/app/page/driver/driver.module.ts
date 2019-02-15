import {NgModule} from '@angular/core';
import {DriverComponent} from './driver.component';
import {SharedModule} from '../../shared/shared.module';
import {DriverRoutingModule} from './driver-routing.module';
import {DriverPanelComponent} from './driver-panel/driver-panel.component';
import {ButtonComponent} from './driver-panel/button/button.component';
import {CarListComponent} from './car-list/car-list.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DriverComponent,
    DriverPanelComponent,
    HeaderComponent,
    CarListComponent],
  imports: [
    SharedModule,
    DriverRoutingModule
  ]
})
export class DriverModule {
}
