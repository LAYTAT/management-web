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
import {OperationPanelComponent} from '../management/operation-panel/operation-panel.component';
import {ModelComponent} from '../management/model/model.component';
import {TimerComponent} from '../management/timer/timer.component';
import {SpeedometerComponent} from '../management/speedometer/speedometer.component';
import {BatteryIndicatorComponent} from '../management/battery-indicator/battery-indicator.component';
import {ButtonComponent} from '../management/button/button.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';

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
    BatteryIndicatorComponent,
    ButtonComponent,
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
