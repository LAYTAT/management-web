import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ImagePipe} from './pipe/image.pipe';
import {GenderPipe} from './pipe/gender.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    GenderPipe,
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ImagePipe,
    GenderPipe,
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: NZ_I18N,
    useValue: zh_CN
  }],
})
export class SharedModule {
}
