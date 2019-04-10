/**
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：长臂模块的定义文件
 */

import {
  CylinderGeometry,
  ExtrudeGeometry,
  Geometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Object3D,
  Shape,
  SpotLight,
  Texture,
  TextureLoader
} from 'three';
import {Common} from '../common';
import {ArmsModule} from './arms';

/* 长臂模块类 */
export class LongArm extends ArmsModule {
  // 灯光物体
  private lightL: SpotLight;
  private lightR: SpotLight;

  // 初始化对象时设置一些初始值
  constructor() {
    super();
    this.maxAngle = 0.6;
    this.minAngle = -0.2;
    this.speed = 0.004;
    this.rotates = 0;
    this.clockwise = true;
  }

  // 开关灯方法
  public lightsOn(operate: boolean): void {
    if (operate) {
      this.model.add(this.lightL);
      this.model.add(this.lightR);
    } else {
      if (this.model.getObjectByName('left-light')) {
        this.model.remove(this.lightL);
      }
      if (this.model.getObjectByName('right-light')) {
        this.model.remove(this.lightR);
      }
    }
  }

  // 父类方法
  modeling(): void {
    // 声明常量
    const mainRadius = 0.4; // 0.4
    const mainLength = mainRadius * 1.4;
    const axisRadius = mainRadius * 0.2;
    const axisHeight = mainLength * 2;
    const flareRadius = mainRadius * 0.2;
    const flareWidth = flareRadius * 0.3;
    const flareLength = mainLength * 0.6;

    // 定义长臂的形体和材质纹理
    const geometry = new Geometry();
    const material = new MeshPhongMaterial({shininess: 100});
    material.map = (new TextureLoader()).load('./assets/textures/yellow1.jpg',
      function (texture: Texture): void {
        material.map = texture;
      });

    // 添加轴承
    const axis = new CylinderGeometry(axisRadius, axisRadius, axisHeight,
      20, 1, false);
    axis.rotateX(Math.PI / 2);
    geometry.merge(axis);

    // 定义拉伸属性
    const extrude = {
      amount: mainLength,
      curveSegments: 30,
      bevelEnabled: false
    };

    // 添加长臂主体
    const main = new ExtrudeGeometry(this.getMainShape(mainRadius), extrude);
    main.translate(0, 0, -mainLength / 2);
    geometry.merge(main);

    // 添加照明灯
    extrude.amount = flareLength;
    const flareR = new ExtrudeGeometry(this.getFlareShape(flareRadius, flareWidth), extrude);
    flareR.translate(7 * mainRadius, 4 * mainRadius, mainLength / 2);
    geometry.merge(flareR);
    const flareL = flareR.clone();
    flareL.translate(0, 0, -mainLength - flareLength);
    geometry.merge(flareL);

    // 合成物体
    this.model = new Object3D();
    this.model.add(Common.createMesh(geometry, material));
    this.model.position.set(1.5 * mainRadius, 1.5 * mainRadius, 0.375 * mainRadius);

    // 光照定向的虚拟物体
    const glassL = Common.createMesh(new Geometry(), new MeshBasicMaterial(),
      7 * mainRadius + flareWidth, 4 * mainRadius, (-mainLength - flareLength) / 2);
    this.model.add(glassL);
    const glassR = glassL.clone();
    glassR.translateZ(mainLength + flareLength);
    this.model.add(glassR);

    // 初始化灯光
    this.lightL = new SpotLight(0xffaa55);
    this.lightL.name = 'left-light';
    this.lightL.target = glassR;
    this.lightL.castShadow = true;
    this.lightL.exponent = 1;
    this.lightL.position.set(7 * mainRadius, 4 * mainRadius, (-mainLength - flareLength) / 2);
    this.lightR = this.lightL.clone();
    this.lightR.name = 'right-light';
    this.lightR.target = glassL;
    this.lightL.translateZ(mainLength + flareLength);
  }

  // 获取长臂的形状
  private getMainShape(r: number): Shape {
    const shape = new Shape();
    shape.moveTo(3 * r, r);
    shape.lineTo(r, 0);
    shape.arc(-r, 0, r, 0, -5 * Math.PI / 3, true);
    shape.lineTo(3 * r, 3 * r);
    shape.bezierCurveTo(4 * r, 4 * r, 6 * r, 5 * r, 7 * r, 5 * r);
    shape.quadraticCurveTo(10 * r, 5.1 * r, 13 * r, 5 * r);
    shape.lineTo(14 * r, 4.8 * r);
    shape.arc(0, -0.3 * r, 0.3 * r, Math.PI / 2, -Math.PI / 2, true);
    shape.lineTo(13 * r, 3.8 * r);
    shape.lineTo(10 * r, 3.4 * r);
    shape.bezierCurveTo(8 * r, 3.2 * r, 6 * r, 2.5 * r, 3 * r, r);
    return shape;
  }

  // 获取照明灯的形状
  private getFlareShape(r: number, l: number): Shape {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.arc(0, 0, r, Math.PI / 2, 1.5 * Math.PI, false);
    shape.lineTo(0, -r - l);
    shape.lineTo(l, -r - l);
    shape.lineTo(l, r + l);
    shape.lineTo(0, r + l);
    shape.lineTo(0, r);
    return shape;
  }

}
