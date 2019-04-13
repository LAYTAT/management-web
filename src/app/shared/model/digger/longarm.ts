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
  // 照明灯
  private flare: Object3D;
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
      this.flare.add(this.lightL);
      this.flare.add(this.lightR);
    } else {
      if (this.flare.getObjectByName('left-light')) {
        this.flare.remove(this.lightL);
      }
      if (this.flare.getObjectByName('right-light')) {
        this.flare.remove(this.lightR);
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
    const flareRadius = mainRadius * 0.4;
    const flareHeight = mainRadius * 0.8;
    const flareLength = flareHeight * 0.5;

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
      depth: mainLength,
      curveSegments: 30,
      bevelEnabled: false
    };

    // 添加长臂主体
    const main = new ExtrudeGeometry(this.getMainShape(mainRadius), extrude);
    main.translate(0, 0, -mainLength / 2);
    geometry.merge(main);

    // 定义照明灯的形体和材质纹理
    const flareGeometry = new Geometry();
    const flareMaterial = new MeshPhongMaterial({shininess: 100});
    flareMaterial.map = (new TextureLoader()).load('./assets/textures/flare.jpg',
      function (texture: Texture): void {
        flareMaterial.map = texture;
      });

    // 添加左右照明灯
    const flareR = new CylinderGeometry(flareRadius / 2, flareRadius, flareLength,
      20, 1, false);
    flareR.translate(0, (flareLength + flareHeight) / 2, 0);
    flareR.merge(new CylinderGeometry(flareRadius, flareRadius, flareHeight,
      20, 1, false));
    flareR.translate(0, flareHeight / 2, 0);
    const flareL = flareR.clone();
    flareL.translate(0, 0, -mainLength / 2 - flareRadius);
    flareR.translate(0, 0, mainLength / 2 + flareRadius);
    flareGeometry.merge(flareL);
    flareGeometry.merge(flareR);
    flareGeometry.rotateZ(Math.PI / 2);

    // 合成物体
    this.model = new Object3D();
    this.model.add(Common.createMesh(geometry, material));
    this.model.position.set(1.5 * mainRadius, 1.5 * mainRadius, 0.375 * mainRadius);
    this.flare = new Object3D();
    this.flare.add(Common.createMesh(flareGeometry, flareMaterial));
    this.flare.position.set(7 * mainRadius, 4 * mainRadius, 0);
    this.model.add(this.flare);

    // 光照定向的虚拟物体
    const glassL = Common.createMesh(new Geometry(), new MeshBasicMaterial(),
      1, 0, -mainLength / 2 - flareRadius);
    this.flare.add(glassL);
    const glassR = glassL.clone();
    glassR.translateZ(mainLength + 2 * flareRadius);
    this.flare.add(glassR);

    // 初始化灯光
    this.lightL = new SpotLight(0xffaa55);
    this.lightL.name = 'left-light';
    this.lightL.target = glassR;
    this.lightL.castShadow = true;
    this.lightL.exponent = 1;
    this.lightL.position.set(0, 0, -mainLength / 2 - flareRadius);
    this.lightR = this.lightL.clone();
    this.lightR.name = 'right-light';
    this.lightR.target = glassL;
    this.lightL.translateZ(mainLength + 2 * flareRadius);
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

}
