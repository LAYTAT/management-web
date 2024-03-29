/**
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：底盘模块的定义文件
 */

import {CylinderGeometry, ExtrudeGeometry, Geometry, Mesh, MeshPhongMaterial, Object3D, Shape, Texture, TextureLoader} from 'three';
import {Common} from '../common';
import {BodyModule} from './body';

/* 底盘模块类 */
export class Chassis extends BodyModule {
  // 路标和材质
  private guideMaterial: MeshPhongMaterial;
  private guideR: Mesh;
  private guideL: Mesh;

  // 移动标识
  private motionFlag: boolean;
  private readonly guideRange: number;
  private readonly mainUnit: number;

  // 初始化对象时设置一些初始值
  constructor() {
    super();
    this.speed = 0.008;
    this.rotates = 0;
    this.clockwise = true;
    this.motionFlag = false;
    this.mainUnit = 0.3;
    this.guideRange = 4 * this.mainUnit;
  }

  // 一直检测
  move(): void {
    if (this.motionFlag) {
      if (Math.abs(this.guideL.position.x) >= this.guideRange) {
        this.guideL.translateX(-2 * this.guideRange);
        this.guideR.translateX(-2 * this.guideRange);
      } else {
        this.guideL.translateX(0.03);
        this.guideR.translateX(0.03);
      }
    }
  }

  // 前进
  moveForward(): void {
    this.guideMaterial.opacity = 0.7;
    this.guideR.rotation.y = 0;
    this.guideL.rotation.y = 0;
    this.motionFlag = true; // 前进
  }

  // 后退
  moveBackward(): void {
    this.guideMaterial.opacity = 0.7;
    this.guideR.rotation.y = Math.PI;
    this.guideL.rotation.y = Math.PI;
    this.motionFlag = true; // 后退
  }

  // 停止
  stopMotion(): void {
    this.motionFlag = false;
    this.guideMaterial.opacity = 0;
    this.guideL.position.set(0, 5 * this.mainUnit, -9 * this.mainUnit);
    this.guideR.position.set(0, 5 * this.mainUnit, 9 * this.mainUnit);
  }

  // 父类方法
  modeling(): void {
    // 声明常量
    const axisRadius = this.mainUnit * 3;
    const axisHeight = this.mainUnit;
    const pipeLength = this.mainUnit * 2;
    const trackLength = this.mainUnit * 2;
    const guideLength = this.mainUnit * 2;

    // 定义底盘的形体和材质纹理
    const geometry = new Geometry();
    const material = new MeshPhongMaterial({shininess: 100});
    material.map = (new TextureLoader()).load('./assets/textures/black.jpg',
      function (texture: Texture): void {
        material.map = texture;
      });

    // 添加轴承
    const axis = new CylinderGeometry(axisRadius, axisRadius, axisHeight,
      30, 1, false);
    axis.translate(0, axisHeight / 2 + pipeLength, 0);
    geometry.merge(axis);

    // 定义拉伸属性
    const extrude = {
      depth: pipeLength,
      bevelEnabled: false,
      curveSegments: 20
    };

    // 添加连接管道
    const pipe = new ExtrudeGeometry(this.getPipeShape(this.mainUnit), extrude);
    pipe.rotateY(-Math.PI / 2);
    pipe.rotateZ(-Math.PI / 2);
    geometry.merge(pipe);

    // 添加履带
    extrude.depth = trackLength;
    const trackL = new ExtrudeGeometry(this.getTrackShape(this.mainUnit), extrude);
    trackL.translate(0, this.mainUnit, this.mainUnit * 3.5);
    geometry.merge(trackL);
    const trackR = trackL.clone();
    trackR.translate(0, 0, -7 * this.mainUnit - trackLength);
    geometry.merge(trackR);

    // 添加路标
    extrude.depth = guideLength;
    const guideGeometry = new ExtrudeGeometry(this.getGuideShape(this.mainUnit), extrude);
    guideGeometry.translate(0.5 * this.mainUnit, 0, -guideLength / 2);
    this.guideMaterial = new MeshPhongMaterial({color: 0x3388ff, opacity: 0, transparent: true});
    this.guideR = Common.createMesh(guideGeometry, this.guideMaterial, 0, 5 * this.mainUnit, 9 * this.mainUnit);
    this.guideR.castShadow = false;
    this.guideL = this.guideR.clone();
    this.guideL.translateZ(-18 * this.mainUnit);

    // 合成物体
    this.model = new Object3D();
    this.model.add(Common.createMesh(geometry, material));
    this.model.add(this.guideR);
    this.model.add(this.guideL);
    this.model.position.set(0, 0.5 * this.mainUnit, 0);
  }

  // 获取连接管道的形状
  private getPipeShape(u: number): Shape {
    const shape = new Shape();
    shape.moveTo(-3.5 * u, 4 * u);
    shape.quadraticCurveTo(0, 2.5 * u, 3.5 * u, 4 * u);
    shape.lineTo(3.5 * u, -4 * u);
    shape.quadraticCurveTo(0, -2.5 * u, -3.5 * u, -4 * u);
    shape.lineTo(-3.5 * u, 4 * u);
    return shape;
  }

  // 获取履带的形状
  private getTrackShape(u: number): Shape {
    const shape = new Shape();
    shape.moveTo(-6 * u, -1.5 * u);
    shape.arc(0, 1.5 * u, 1.5 * u, 1.5 * Math.PI, 0.5 * Math.PI, true);
    shape.quadraticCurveTo(0, 2.5 * u, 6 * u, 1.5 * u);
    shape.arc(0, -1.5 * u, 1.5 * u, Math.PI / 2, -Math.PI / 2, true);
    shape.lineTo(-6 * u, -1.5 * u);
    return shape;
  }

  // 获取路标的形状
  private getGuideShape(u: number): Shape {
    const shape = new Shape();
    shape.moveTo(-4 * u, -u);
    shape.lineTo(-4 * u, u);
    shape.lineTo(0, u);
    shape.lineTo(-u, 3 * u);
    shape.lineTo(3 * u, 0);
    shape.lineTo(-u, -3 * u);
    shape.lineTo(0, -u);
    shape.lineTo(-4 * u, -u);
    return shape;
  }

}
