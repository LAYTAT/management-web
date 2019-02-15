import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';
import {NotFoundComponent} from './page/not-found/not-found.component';
import {ErrorInterceptor} from './injectable/interceptor/ErrorInterceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UnauthorizationComponent} from './page/unauthorization/unauthorization.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UnauthorizationComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ]
})
export class AppModule {
}
