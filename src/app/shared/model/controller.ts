/**
 * 作者：郑庆文
 * 时间：2019-03-29
 * 邮箱：quinceyzheng@126.com
 * 说明：模型与实物控制的文件
 */

import {KeyboardEventService} from '../service/keyboard-event.service';
import {filter, map} from 'rxjs/operators';
import {ModelComponent} from './model.component';
import {fromEvent} from 'rxjs';
import {AuthService} from '../service/auth.service';

/* 控制的业务处理类 */
export class Controller {
  // 模型组件对象
  private model: ModelComponent;
  // 按键事件服务对象
  private keyboardEventService: KeyboardEventService;
  // MQTT服务对象

  // 注入服务
  constructor(model: ModelComponent, keyboardEventService: KeyboardEventService,
              private authService: AuthService) {
    this.model = model;
    this.keyboardEventService = keyboardEventService;
  }

  /*************>业务处理函数<*************/
  private turnBucketUp(): void {
    this.model.digger.turnBucketUp();
  }

  private turnBucketDown(): void {
    this.model.digger.turnBucketDown();
  }

  private stopBucketRotation(): void {
    this.model.digger.stopBucketRotation();
  }

  private turnMiddleArmUp(): void {
    this.model.digger.turnMiddleArmUp();
  }

  private turnMiddleArmDown(): void {
    this.model.digger.turnMiddleArmDown();
  }

  private stopMiddleArmRotation(): void {
    this.model.digger.stopMiddleArmRotation();
  }

  private turnLongArmUp(): void {
    this.model.digger.turnLongArmUp();
  }

  private turnLongArmDown(): void {
    this.model.digger.turnLongArmDown();
  }

  private stopLongArmRotation(): void {
    this.model.digger.stopLongArmRotation();
  }

  private turnMainBodyLeft(): void {
    this.model.digger.turnMainBodyLeft();
  }

  private turnMainBodyRight(): void {
    this.model.digger.turnMainBodyRight();
  }

  private stopMainBodyRotation(): void {
    this.model.digger.stopMainBodyRotation();
  }

  private turnDiggerLeft(): void {
    this.model.digger.turnDiggerLeft();
  }

  private turnDiggerRight(): void {
    this.model.digger.turnDiggerRight();
  }

  private stopDiggerRotation(): void {
    this.model.digger.stopDiggerRotation();
  }

  private moveDiggerForward(): void {
    this.model.digger.moveDiggerForward();
  }

  private moveDiggerBackward(): void {
    this.model.digger.moveDiggerBackward();
  }

  private stopDiggerMotion(): void {
    this.model.digger.stopDiggerMotion();
  }

  private switchLights(): void {
    this.model.digger.switchLights();
  }

  /****************>结束<****************/

  // 按键按下服务
  public subscribeKeyDown(): void {
    this.keyboardEventService.keydown$.pipe(
      filter(() => this.authService.qualified)
    ).subscribe(
      event => {
        switch (event.key) {
          case 'y':
            this.turnBucketUp();
            break;
          case 'h':
            this.turnBucketDown();
            break;
          case 'u':
            this.turnMiddleArmUp();
            break;
          case 'j':
            this.turnMiddleArmDown();
            break;
          case 'i':
            this.turnLongArmUp();
            break;
          case 'k':
            this.turnLongArmDown();
            break;
          case 'o':
            this.turnMainBodyLeft();
            break;
          case 'l':
            this.turnMainBodyRight();
            break;
          case 'a':
            this.turnDiggerLeft();
            break;
          case 'd':
            this.turnDiggerRight();
            break;
          case 'w':
            this.moveDiggerForward();
            break;
          case 's':
            this.moveDiggerBackward();
            break;
          case 'p':
            this.switchLights();
        }
      }
    );
  }

  // 按键弹起服务
  public subscribeKeyUp(): void {
    this.keyboardEventService.keyup$.pipe(
      filter(() => this.authService.qualified),
    ).subscribe(
      event => {
        switch (event.key) {
          case 'y':
            this.stopBucketRotation();
            break;
          case 'h':
            this.stopBucketRotation();
            break;
          case 'u':
            this.stopMiddleArmRotation();
            break;
          case 'j':
            this.stopMiddleArmRotation();
            break;
          case 'i':
            this.stopLongArmRotation();
            break;
          case 'k':
            this.stopLongArmRotation();
            break;
          case 'o':
            this.stopMainBodyRotation();
            break;
          case 'l':
            this.stopMainBodyRotation();
            break;
          case 'a':
            this.stopDiggerRotation();
            break;
          case 'd':
            this.stopDiggerRotation();
            break;
          case 'w':
            this.stopDiggerMotion();
            break;
          case 's':
            this.stopDiggerMotion();
        }
      }
    );
  }


  subscribeTouchStart(): void {
    fromEvent(document, 'touchstart')
      .pipe(
        filter(() => this.authService.qualified),
        map(event => event.target['innerText'])
      )
      .subscribe(text => {
        switch (text) {
          case 'Y':
            this.turnBucketUp();
            break;
          case 'H':
            this.turnBucketDown();
            break;
          case 'U':
            this.turnMiddleArmUp();
            break;
          case 'J':
            this.turnMiddleArmDown();
            break;
          case 'I':
            this.turnLongArmUp();
            break;
          case 'K':
            this.turnLongArmDown();
            break;
          case 'O':
            this.turnMainBodyLeft();
            break;
          case 'L':
            this.turnMainBodyRight();
            break;
          case 'A':
            this.turnDiggerLeft();
            break;
          case 'D':
            this.turnDiggerRight();
            break;
          case 'W':
            this.moveDiggerForward();
            break;
          case 'S':
            this.moveDiggerBackward();
            break;
        }
      });
  }

  subscribeTouchEnd(): void {
    fromEvent(document, 'touchend')
      .pipe(
        map(event => event.target['innerText'])
      )
      .subscribe(text => {
        switch (text) {
          case 'Y':
            this.stopBucketRotation();
            break;
          case 'H':
            this.stopBucketRotation();
            break;
          case 'U':
            this.stopMiddleArmRotation();
            break;
          case 'J':
            this.stopMiddleArmRotation();
            break;
          case 'I':
            this.stopLongArmRotation();
            break;
          case 'K':
            this.stopLongArmRotation();
            break;
          case 'O':
            this.stopMainBodyRotation();
            break;
          case 'L':
            this.stopMainBodyRotation();
            break;
          case 'A':
            this.stopDiggerRotation();
            break;
          case 'D':
            this.stopDiggerRotation();
            break;
          case 'W':
            this.stopDiggerMotion();
            break;
          case 'S':
            this.stopDiggerMotion();
            break;
        }
      });
  }
}
