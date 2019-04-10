/**
 * 作者：郑庆文
 * 时间：2019-03-23
 * 邮箱：quinceyzheng@126.com
 * 说明：挖掘机模型文件
 */

import {Scene} from 'three';
import {Chassis} from './chassis';
import {MainBody} from './mainbody';
import {LongArm} from './longarm';
import {MiddleArm} from './middlearm';
import {Bucket} from './bucket';

/* 挖掘机类 */
export class Digger {
  // 挖掘机各模块对象
  private chassis: Chassis;
  private mainBody: MainBody;
  private longArm: LongArm;
  private middleArm: MiddleArm;
  private bucket: Bucket;
  // 挖掘机其他属性
  private lightsOn: boolean;

  // 初始化挖掘机信息和添加挖掘机对象
  constructor(scene: Scene, size: number) {
    this.lightsOn = false;
    this.modeling();
    this.chassis.model.scale.set(size, size, size);
    scene.add(this.chassis.model);
  }

  /************************>1.挖掘机移动的函数集<***************************/
  // 一直前进
  public moveDiggerForward(): void {
    this.chassis.moveForward();
  }

  // 角度设置函数：一般初始时设置
  public setAngles(chassisAngle: number, mainBodyAngle: number, longArmAngle: number,
                   middleArmAngle: number, bucketAngle: number): void {
    this.chassis.setAngle(chassisAngle);
    this.mainBody.setAngle(mainBodyAngle);
    this.longArm.setAngle(longArmAngle);
    this.middleArm.setAngle(middleArmAngle);
    this.bucket.setAngle(bucketAngle);
  }

  // 核心旋转函数：提供给循环渲染
  public turn(): void {
    this.chassis.turn();
    this.mainBody.turn();
    this.longArm.turn();
    this.middleArm.turn();
    this.bucket.turn();
  }

  /************************>3.主体转向的函数集<***************************/
  // 一直左转
  public turnMainBodyLeft(): void {
    this.mainBody.setClock(1);
    this.mainBody.setTimes(-1);
  }
  // 一直后退
  public moveDiggerBackward(): void {
    this.chassis.moveBackward();
  }
  // 停止移动
  public stopDiggerMotion(): void {
    this.chassis.stopMotion();
  }
  /*******************************>1结束<********************************/

  /************************>2.挖掘机转向的函数集<***************************/
  // 一直左转
  public turnDiggerLeft(): void {
    this.chassis.setClock(1);
    this.chassis.setTimes(-1);
  }
  // 一直右转
  public turnDiggerRight(): void {
    this.chassis.setClock(-1);
    this.chassis.setTimes(-1);
  }
  // 停止转动
  public stopDiggerRotation(): void {
    this.chassis.stop();
  }
  /*******************************>2结束<********************************/

  // 停止转动
  public stopMainBodyRotation(): void {
    this.mainBody.stop();
  }
  // 一直右转
  public turnMainBodyRight(): void {
    this.mainBody.setClock(-1);
    this.mainBody.setTimes(-1);
  }

  // 停止转动
  public stopLongArmRotation(): void {
    this.longArm.stop();
  }

  /*******************************>3结束<********************************/

  /************************>4.长臂旋转的函数集<***************************/
  // 一直上转
  public turnLongArmUp(): void {
    this.longArm.setClock(1);
    this.longArm.setTimes(-1);
  }
  // 一直下转
  public turnLongArmDown(): void {
    this.longArm.setClock(-1);
    this.longArm.setTimes(-1);
  }

  // 停止转动
  public stopMiddleArmRotation(): void {
    this.middleArm.stop();
  }

  /*******************************>4结束<********************************/

  /************************>5.中臂旋转的函数集<***************************/
  // 一直上转
  public turnMiddleArmUp(): void {
    this.middleArm.setClock(1);
    this.middleArm.setTimes(-1);
  }
  // 一直下转
  public turnMiddleArmDown(): void {
    this.middleArm.setClock(-1);
    this.middleArm.setTimes(-1);
  }

  // 停止转动
  public stopBucketRotation(): void {
    this.bucket.stop();
  }

  /*******************************>5结束<********************************/

  /************************>6.挖斗旋转的函数集<***************************/
  // 一直上转
  public turnBucketUp(): void {
    this.bucket.setClock(1);
    this.bucket.setTimes(-1);
  }
  // 一直下转
  public turnBucketDown(): void {
    this.bucket.setClock(-1);
    this.bucket.setTimes(-1);
  }

  // 构建挖掘机对象
  private modeling(): void {
    // 创建对象和建模
    this.chassis = new Chassis();
    this.chassis.modeling();
    this.mainBody = new MainBody();
    this.mainBody.modeling();
    this.longArm = new LongArm();
    this.longArm.modeling();
    this.middleArm = new MiddleArm();
    this.middleArm.modeling();
    this.bucket = new Bucket();
    this.bucket.modeling();
    // 添加包含关系
    this.middleArm.model.add(this.bucket.model);
    this.longArm.model.add(this.middleArm.model);
    this.mainBody.model.add(this.longArm.model);
    this.chassis.model.add(this.mainBody.model);
  }

  /*******************************>6结束<********************************/

  /************************>7.挖掘机附加的函数集<***************************/
  // 开关灯光
  public switchLights(): void {
    this.lightsOn = !this.lightsOn;
    this.longArm.lightsOn(this.lightsOn);
  }
  /*******************************>7结束<********************************/

}
