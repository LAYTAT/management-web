import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminListComponent} from './user-list/admin-list/admin-list.component';
import {ManagementComponent} from './management.component';
import {AdminAuthGuard} from '../shared/guard/admin-auth.guard';
import {DiggerListComponent} from './car-list/digger-list/digger-list.component';
import {DriverListComponent} from './user-list/driver-list/driver-list.component';
import {PushdozerListComponent} from './car-list/pushdozer-list/pushdozer-list.component';
import {DiggerDetailComponent} from './digger-detail/digger-detail.component';
import {PushdozerDetailComponent} from './pushdozer-detail/pushdozer-detail.component';
import {BossAuthGuard} from '../shared/guard/boss-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: 'admins',
        component: AdminListComponent,
        canActivate: [BossAuthGuard]
      },
      {
        path: '',
        canActivateChild: [AdminAuthGuard],
        children: [
          {path: 'diggers', component: DiggerListComponent},
          {path: 'diggers/:id', component: DiggerDetailComponent},
          {path: 'pushdozers', component: PushdozerListComponent},
          {path: 'pushdozers/:id', component: PushdozerDetailComponent},
          {path: 'drivers', component: DriverListComponent},
          {path: '', redirectTo: 'diggers', pathMatch: 'full'}
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
