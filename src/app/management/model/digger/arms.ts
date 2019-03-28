/*
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：这是机械臂模型模块的定义文件
 */

import {Object3D} from 'three';
import {DiggerModule} from './common';

export abstract class ArmsModule implements DiggerModule {
  // 最大绝对活动角度
  maxAngle: number;
  // 最小绝对活动角度
  minAngle: number;
  // 接口属性
  speed: number;
  clockwise: boolean;
  rotates: number;
  model: Object3D;

  // 接口方法
  modeling(): void {
    console.log('ArmsModule');
  }

  turn(): void {
    if (this.rotates === 0) {
      return;
    }
    const sign = this.clockwise ? 1 : -1;
    if (this.rotates > 0) {
      this.rotates--;
    }
    this.model.rotation.z += sign * this.speed; // 暂时旋转
    const remainder = this.model.rotation.z % (2 * Math.PI); // 求余数
    if (remainder > this.maxAngle || remainder < this.minAngle) { // 判断角度
      this.model.rotation.z -= sign * this.speed; // 恢复角度
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
