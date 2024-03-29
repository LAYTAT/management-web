import {AdminListComponent} from './user-list/admin-list/admin-list.component';
import {ManagementComponent} from './management.component';
import {ManagementRoutingModule} from './management-routing.module';
import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {CarDetailComponent} from './car-detail/car-detail.component';
import {DriverListComponent} from './user-list/driver-list/driver-list.component';
import {UserListComponent} from './user-list/user-list.component';
import {DriversComponent} from './drivers/drivers.component';
import {CarProfileComponent} from './car-profile/car-profile.component';
import {HeaderComponent} from './header/header.component';
import {PushdozerDetailComponent} from './pushdozer-detail/pushdozer-detail.component';
import {DiggerDetailComponent} from './digger-detail/digger-detail.component';
import {CarListComponent} from './car-list/car-list.component';
import {PushdozerListComponent} from './car-list/pushdozer-list/pushdozer-list.component';
import {DiggerListComponent} from './car-list/digger-list/digger-list.component';

@NgModule({
  declarations: [
    ManagementComponent,
    DiggerListComponent,
    AdminListComponent,
    CarDetailComponent,
    DriverListComponent,
    PushdozerListComponent,
    UserListComponent,
    DriversComponent,
    CarProfileComponent,
    HeaderComponent,
    PushdozerDetailComponent,
    DiggerDetailComponent,
    CarListComponent
  ],
  exports: [],
  imports: [
    ManagementRoutingModule,
    SharedModule
  ]
})
export class ManagementModule {
}
