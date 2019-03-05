import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {AdminAuthGuard} from './shared/guard/admin-auth.guard';
import {DriverAuthGuard} from './shared/guard/driver-auth.guard';
import {UnauthorizationComponent} from './unauthorization/unauthorization.component';

const routes: Routes = [
  {
    path: 'management',
    loadChildren: './management/management.module#ManagementModule',
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'unauthorization',
    component: UnauthorizationComponent
  },
  {
    path: '',
    loadChildren: './driver/driver.module#DriverModule',
    canLoad: [DriverAuthGuard]
  },
  {path: '**', component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
