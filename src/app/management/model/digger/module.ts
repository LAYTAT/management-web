/*
 * 作者：郑庆文
 * 时间：2019-03-29
 * 邮箱：quinceyzheng@126.com
 * 说明：这是挖掘机模型模块的接口文件
 */

import {Object3D} from 'three';
import {Digger} from './digger';

/* 挖掘机3D模型模块的接口 */
export interface DiggerModule {
  // 3D模型对象
  model: Object3D;
  // 旋转速度：每次旋转的角度
  speed: number;
  // 旋转次数：整数，正数代表对应旋转次数，负数代表无限旋转，0代表停止
  rotates: number;
  // 旋转方向：true代表顺时针，false代表逆时针
  clockwise: boolean;

  // 模型转动函数
  turn(): void;

  // 模型停止函数
  stop(): void;

  // 建模加载函数
  modeling(digger: Digger): void;

  // 角度设置函数
  setAngle(angle: number): void;

  // 次数设置函数
  setTimes(times: number): void;

  // 方向设置函数
  setClock(clock: number): void;

}
