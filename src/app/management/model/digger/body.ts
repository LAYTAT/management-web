/*
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：这是主体模型模块的定义文件
 */

import {Object3D} from 'three';
import {DiggerModule} from './module';
import {Digger} from './digger';

export abstract class BodyModule implements DiggerModule {
  // 接口属性
  speed: number;
  rotates: number;
  clockwise: boolean;
  model: Object3D;

  // 接口方法
  modeling(digger: Digger): void {
  }

  turn(): void {
    if (this.rotates === 0) {
      return;
    } else if (this.rotates > 0) {
      this.rotates--;
    }
    const sign = this.clockwise ? 1 : -1;
    this.model.rotation.y += sign * this.speed;
  }

  stop(): void {
    this.rotates = 0;
  }

  setTimes(times: number): void {
    this.rotates = times;
  }

  setAngle(angle: number): void {
    this.model.rotation.y = angle;
  }

  setClock(clock: number): void {
    this.clockwise = (clock >= 0);
  }

}
