import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DriverComponent} from './driver.component';
import {DriverPanelComponent} from './driver-panel/driver-panel.component';
import {DriverAuthGuard} from '../shared/guard/driver-auth.guard';
import {CarListComponent} from './car-list/car-list.component';

const routes: Routes = [
  {
    path: '',
    component: DriverComponent,
    canActivate: [DriverAuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [DriverAuthGuard],
        children: [
          {
            path: 'cars',
            component: CarListComponent
          },
          {
            path: 'cars/:id',
            component: DriverPanelComponent
          },
          {
            path: '',
            redirectTo: 'cars',
            pathMatch: 'full'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule {
}
