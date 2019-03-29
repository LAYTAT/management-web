/*
 * 作者：郑庆文
 * 时间：2019-03-23
 * 邮箱：quinceyzheng@126.com
 * 说明：这是挖掘机模型的库文件
 */

import {Scene} from 'three';
import {Chassis} from './chassis';
import {MainBody} from './mainbody';
import {LongArm} from './longarm';
import {MiddleArm} from './middlearm';
import {Bucket} from './bucket';

// 挖掘机类
export class Digger {
  // 挖掘机各模块对象
  private chassis: Chassis;
  private mainBody: MainBody;
  private longArm: LongArm;
  private middleArm: MiddleArm;
  private bucket: Bucket;

  // 初始化对象
  constructor(scene: Scene) {
    this.chassis = new Chassis();
    this.chassis.modeling(this);
    scene.add(this.chassis.model);
  }

  // 属性注入函数
  public setChassis(chassis: Chassis): void {
    this.chassis = chassis;
  }

  public setMainBody(mainBody: MainBody): void {
    this.mainBody = mainBody;
  }

  public setLongArm(longArm: LongArm): void {
    this.longArm = longArm;
  }

  public setMiddleArm(middleArm: MiddleArm): void {
    this.middleArm = middleArm;
  }

  public setBucket(bucket: Bucket): void {
    this.bucket = bucket;
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

  /************************>1.挖掘机移动的函数集<***************************/
  // 一直前进
  public moveDiggerForward(): void {
  }
  // 一直后退
  public moveDiggerBackward(): void {
  }
  // 停止移动
  public stopDiggerMotion(): void {
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

  /************************>3.主体转向的函数集<***************************/
  // 一直左转
  public turnMainBodyLeft(): void {
    this.mainBody.setClock(-1);
    this.mainBody.setTimes(-1);
  }
  // 一直右转
  public turnMainBodyRight(): void {
    this.mainBody.setClock(1);
    this.mainBody.setTimes(-1);
  }
  // 停止转动
  public stopMainBodyRotation(): void {
    this.mainBody.stop();
  }
  /*******************************>3结束<********************************/

  /************************>4.长臂旋转的函数集<***************************/
  // 一直上转
  public turnLongArmUp(): void {
    this.longArm.setClock(-1);
    this.longArm.setTimes(-1);
  }
  // 一直下转
  public turnLongArmDown(): void {
    this.longArm.setClock(1);
    this.longArm.setTimes(-1);
  }
  // 停止转动
  public stopLongArmRotation(): void {
    this.longArm.stop();
  }
  /*******************************>4结束<********************************/

  /************************>5.中臂旋转的函数集<***************************/
  // 一直上转
  public turnMiddleArmUp(): void {
    this.middleArm.setClock(-1);
    this.middleArm.setTimes(-1);
  }
  // 一直下转
  public turnMiddleArmDown(): void {
    this.middleArm.setClock(1);
    this.middleArm.setTimes(-1);
  }
  // 停止转动
  public stopMiddleArmRotation(): void {
    this.middleArm.stop();
  }
  /*******************************>5结束<********************************/

  /************************>6.挖斗旋转的函数集<***************************/
  // 一直上转
  public turnBucketUp(): void {
    this.bucket.setClock(-1);
    this.bucket.setTimes(-1);
  }
  // 一直下转
  public turnBucketDown(): void {
    this.bucket.setClock(1);
    this.bucket.setTimes(-1);
  }
  // 停止转动
  public stopBucketRotation(): void {
    this.bucket.stop();
  }
  /*******************************>6结束<********************************/

  /************************>7.挖掘机附加的函数集<***************************/
  /*******************************>7结束<********************************/

}
