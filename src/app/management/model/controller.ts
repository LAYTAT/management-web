/**
 * 作者：郑庆文
 * 时间：2019-03-29
 * 邮箱：quinceyzheng@126.com
 * 说明：模型与实物控制的文件
 */

import {KeyboardEventService} from '../../shared/service/keyboard-event.service';
import {filter} from 'rxjs/operators';
import {Digger} from './digger/digger';

// 控制的业务处理类
export class Controller {
  // 挖掘机模型对象
  private digger: Digger;
  // 按键事件服务对象
  private keyboardEventService: KeyboardEventService;
  // MQTT服务对象

  // 注入服务
  constructor(digger: Digger, keyboardEventService: KeyboardEventService) {
    this.digger = digger;
    this.keyboardEventService = keyboardEventService;
  }

  /****************>结束<****************/

  // 按键按下服务
  public subscribeKeyDown(): void {
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'y')
    ).subscribe(() => this.turnBucketUp());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'h')
    ).subscribe(() => this.turnBucketDown());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'u')
    ).subscribe(() => this.turnMiddleArmUp());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'j')
    ).subscribe(() => this.turnMiddleArmDown());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'i')
    ).subscribe(() => this.turnLongArmUp());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'k')
    ).subscribe(() => this.turnLongArmDown());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'o')
    ).subscribe(() => this.turnMainBodyLeft());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'l')
    ).subscribe(() => this.turnMainBodyRight());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'a')
    ).subscribe(() => this.turnDiggerLeft());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'd')
    ).subscribe(() => this.turnDiggerRight());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'w')
    ).subscribe(() => this.moveDiggerForward());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 's')
    ).subscribe(() => this.moveDiggerBackward());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'p')
    ).subscribe(() => this.switchLights());
  }

  // 按键弹起服务
  public subscribeKeyUp(): void {
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'y')
    ).subscribe(() => this.stopBucketRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'h')
    ).subscribe(() => this.stopBucketRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'u')
    ).subscribe(() => this.stopMiddleArmRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'j')
    ).subscribe(() => this.stopMiddleArmRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'i')
    ).subscribe(() => this.stopLongArmRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'k')
    ).subscribe(() => this.stopLongArmRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'o')
    ).subscribe(() => this.stopMainBodyRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'l')
    ).subscribe(() => this.stopMainBodyRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'a')
    ).subscribe(() => this.stopDiggerRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'd')
    ).subscribe(() => this.stopDiggerRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'w')
    ).subscribe(() => this.stopDiggerMotion());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 's')
    ).subscribe(() => this.stopDiggerMotion());
  }

  /*************>业务处理函数<*************/
  private turnBucketUp(): void {
    this.digger.turnBucketUp();
  }

  private turnBucketDown(): void {
    this.digger.turnBucketDown();
  }

  private stopBucketRotation(): void {
    this.digger.stopBucketRotation();
  }

  private turnMiddleArmUp(): void {
    this.digger.turnMiddleArmUp();
  }

  private turnMiddleArmDown(): void {
    this.digger.turnMiddleArmDown();
  }

  private stopMiddleArmRotation(): void {
    this.digger.stopMiddleArmRotation();
  }

  private turnLongArmUp(): void {
    this.digger.turnLongArmUp();
  }

  private turnLongArmDown(): void {
    this.digger.turnLongArmDown();
  }

  private stopLongArmRotation(): void {
    this.digger.stopLongArmRotation();
  }

  private turnMainBodyLeft(): void {
    this.digger.turnMainBodyLeft();
  }

  private turnMainBodyRight(): void {
    this.digger.turnMainBodyRight();
  }

  private stopMainBodyRotation(): void {
    this.digger.stopMainBodyRotation();
  }

  private turnDiggerLeft(): void {
    this.digger.turnDiggerLeft();
  }

  private turnDiggerRight(): void {
    this.digger.turnDiggerRight();
  }

  private stopDiggerRotation(): void {
    this.digger.stopDiggerRotation();
  }

  private moveDiggerForward(): void {
    this.digger.moveDiggerForward();
  }

  private moveDiggerBackward(): void {
    this.digger.moveDiggerBackward();
  }

  private stopDiggerMotion(): void {
    this.digger.stopDiggerMotion();
  }

  private switchLights(): void {
    this.digger.switchLights();
  }

}
