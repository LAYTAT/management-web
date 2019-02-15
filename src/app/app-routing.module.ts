import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './page/not-found/not-found.component';
import {AdminAuthGuard} from './injectable/guard/admin-auth.guard';
import {DriverAuthGuard} from './injectable/guard/driver-auth.guard';
import {UnauthorizationComponent} from './page/unauthorization/unauthorization.component';

const routes: Routes = [
  {
    path: 'management',
    loadChildren: './page/management/management.module#ManagementModule',
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'unauthorization',
    component: UnauthorizationComponent
  },
  {
    path: '',
    loadChildren: './page/driver/driver.module#DriverModule',
    canLoad: [DriverAuthGuard]
  },
  {path: '**', component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
