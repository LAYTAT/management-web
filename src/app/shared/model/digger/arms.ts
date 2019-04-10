/**
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：机械臂各模块的定义文件
 */

import {Object3D} from 'three';
import {DiggerModule} from './module';

/* 机械臂各模块的父类 */
export abstract class ArmsModule implements DiggerModule {
  // 最大绝对活动角度
  maxAngle: number;
  // 最小绝对活动角度
  minAngle: number;
  // 接口属性
  speed: number;
  rotates: number;
  clockwise: boolean;
  model: Object3D;

  // 接口方法
  modeling(): void {
  }

  turn(): void {
    if (this.rotates === 0) {
      return;
    } else if (this.rotates > 0) {
      this.rotates--;
    }
    const sign = this.clockwise ? 1 : -1;
    const temp = this.model.rotation.z + sign * this.speed;
    const remainder = temp % (2 * Math.PI);
    if (remainder >= this.minAngle && remainder <= this.maxAngle) {
      this.model.rotation.z = remainder;
    }
  }

  stop(): void {
    this.rotates = 0;
  }

  setTimes(times: number): void {
    this.rotates = times;
  }

  setAngle(angle: number): void {
    if (angle >= this.minAngle && angle <= this.maxAngle) {
      this.model.rotation.z = angle;
    }
  }

  setClock(clock: number): void {
    this.clockwise = (clock >= 0);
  }

}
