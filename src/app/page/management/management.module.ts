import {AdminListComponent} from './user-list/admin-list/admin-list.component';
import {ManagementComponent} from './management.component';
import {ManagementRoutingModule} from './management-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgModule} from '@angular/core';
import {DiggerListComponent} from './car-list/digger-list/digger-list.component';
import {CarDetailComponent} from './car-detail/car-detail.component';
import {DriverListComponent} from './user-list/driver-list/driver-list.component';
import {PushdozerListComponent} from './car-list/pushdozer-list/pushdozer-list.component';
import {GenderPipe} from '../../pipe/gender.pipe';
import {UserListComponent} from './user-list/user-list.component';
import {DriversComponent} from './car-detail/drivers/drivers.component';
import {OperationPanelComponent} from './car-detail/operation-panel/operation-panel.component';
import {ButtonComponent} from './car-detail/operation-panel/button/button.component';
import {CarProfileComponent} from './car-detail/car-profile/car-profile.component';
import {HeaderComponent} from './header/header.component';
import {PushdozerDetailComponent} from './car-detail/pushdozer-detail/pushdozer-detail.component';
import {DiggerDetailComponent} from './car-detail/digger-detail/digger-detail.component';
import {CarListComponent} from './car-list/car-list.component';

@NgModule({
  declarations: [
    GenderPipe,
    ManagementComponent,
    DiggerListComponent,
    AdminListComponent,
    CarDetailComponent,
    DriverListComponent,
    PushdozerListComponent,
    UserListComponent,
    DriversComponent,
    OperationPanelComponent,
    ButtonComponent,
    CarProfileComponent,
    HeaderComponent,
    PushdozerDetailComponent,
    DiggerDetailComponent,
    CarListComponent
  ],
  imports: [
    ManagementRoutingModule,
    SharedModule
  ]
})
export class ManagementModule {
}
