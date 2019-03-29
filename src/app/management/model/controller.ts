/*
 * 作者：郑庆文
 * 时间：2019-03-29
 * 邮箱：quinceyzheng@126.com
 * 说明：这是模型与实物控制的文件
 */

import {KeyboardEventService} from '../../shared/service/keyboard-event.service';
import {filter} from 'rxjs/operators';
import {Digger} from './digger/digger';

// 控制的业务处理类
export class Controller {
  // 单例模式
  private static controller: Controller;
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

  // 测试
  public static getDefaultObject(digger: Digger, keyboardEventService: KeyboardEventService): Controller {
    if (!Controller.controller) {
      Controller.controller = new Controller(digger, keyboardEventService);
    }
    return Controller.controller;
  }

  /*************>业务处理函数<*************/

  // private turnBucketUp()
  /****************>结束<****************/

  // 按键按下服务
  public subscribeKeyDown(): void {
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'y')
    ).subscribe(() => this.digger.turnBucketUp());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'h')
    ).subscribe(() => this.digger.turnBucketDown());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'u')
    ).subscribe(() => this.digger.turnMiddleArmUp());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'j')
    ).subscribe(() => this.digger.turnMiddleArmDown());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'i')
    ).subscribe(() => this.digger.turnLongArmUp());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'k')
    ).subscribe(() => this.digger.turnLongArmDown());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'o')
    ).subscribe(() => this.digger.turnMainBodyLeft());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'l')
    ).subscribe(() => this.digger.turnMainBodyRight());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'a')
    ).subscribe(() => this.digger.turnDiggerLeft());
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === 'd')
    ).subscribe(() => this.digger.turnDiggerRight());
  }

  // 按键弹起服务
  public subscribeKeyUp(): void {
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'y')
    ).subscribe(() => this.digger.stopBucketRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'h')
    ).subscribe(() => this.digger.stopBucketRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'u')
    ).subscribe(() => this.digger.stopMiddleArmRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'j')
    ).subscribe(() => this.digger.stopMiddleArmRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'i')
    ).subscribe(() => this.digger.stopLongArmRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'k')
    ).subscribe(() => this.digger.stopLongArmRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'o')
    ).subscribe(() => this.digger.stopMainBodyRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'l')
    ).subscribe(() => this.digger.stopMainBodyRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'a')
    ).subscribe(() => this.digger.stopDiggerRotation());
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === 'd')
    ).subscribe(() => this.digger.stopDiggerRotation());
  }

}
