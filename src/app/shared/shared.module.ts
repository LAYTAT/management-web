import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ImagePipe} from './pipe/image.pipe';
import {GenderPipe} from './pipe/gender.pipe';
import {ElapsedTimePipe} from './pipe/elapsed-time.pipe';
import {GaugesModule} from 'ng-beautiful-gauges';
import {CarPipe} from './pipe/car.pipe';
import {BigScreenModule} from 'angular-bigscreen';
import {OperationPanelComponent} from './operation-panel/operation-panel.component';
import {ModelComponent} from './model/model.component';
import {TimerComponent} from './timer/timer.component';
import {SpeedometerComponent} from './speedometer/speedometer.component';
import {ButtonComponent} from './button/button.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {WeatherComponent} from './weather/weather.component';

@NgModule({
  declarations: [
    ImagePipe,
    GenderPipe,
    ElapsedTimePipe,
    CarPipe,
    OperationPanelComponent,
    ModelComponent,
    TimerComponent,
    SpeedometerComponent,
    ButtonComponent,
    WeatherComponent,
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GaugesModule,
    BigScreenModule,
    NgxChartsModule
  ],
  exports: [
    ImagePipe,
    GenderPipe,
    CarPipe,
    ElapsedTimePipe,
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GaugesModule,
    BigScreenModule,
    NgxChartsModule,
    OperationPanelComponent
  ],
  providers: [{
    provide: NZ_I18N,
    useValue: zh_CN
  }],
})
export class SharedModule {
}
