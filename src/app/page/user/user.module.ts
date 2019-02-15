import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../../shared/shared.module';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent],
  imports: [
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule {
}
