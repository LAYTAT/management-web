import {AppRoutingModule} from './app-routing.module';
import {NgModule} from '@angular/core';
import {MqttModule} from 'ngx-mqtt';
import {environment} from '../environments/environment';
import {UserModule} from './user/user.module';
import {JwtModule} from '@auth0/angular-jwt';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

export function getToken() {
  return localStorage.getItem('access_token');
}

registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    MqttModule.forRoot({
      hostname: environment.mqttHostname,
      port: environment.mqttPort,
      path: '/mqtt'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: [`${environment.domain}/users/login`],
        skipWhenExpired: true
      }
    }),
    UserModule,
    AppRoutingModule
  ],
  exports: [
    MqttModule,
    JwtModule,
    UserModule,
    AppRoutingModule
  ]
})
export class CoreModule {
}
