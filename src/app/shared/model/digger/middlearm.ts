/**
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：中臂模块的定义文件
 */

import {
  CylinderGeometry,
  ExtrudeGeometry,
  Geometry,
  MeshPhongMaterial,
  Object3D,
  Shape,
  SphereGeometry,
  Texture,
  TextureLoader
} from 'three';
import {Common} from '../common';
import {ArmsModule} from './arms';

/* 中臂模块类 */
export class MiddleArm extends ArmsModule {
  // 初始化对象时设置一些初始值
  constructor() {
    super();
    this.maxAngle = 1.2;
    this.minAngle = -0.2;
    this.speed = 0.006;
    this.rotates = 0;
    this.clockwise = true;
  }

  // 父类方法
  modeling(): void {
    // 声明常量
    const mainRadius = 0.12; // 0.12
    const mainLength = mainRadius * 3;
    const axisRadius = mainRadius * 0.7;
    const axisHeight = mainLength * 1.8;
    const nutRadius = axisRadius * 0.8;

    // 定义中臂的形体和材质纹理
    const geometry = new Geometry();
    const material = new MeshPhongMaterial({shininess: 100});
    material.map = (new TextureLoader()).load('./assets/textures/yellow.jpg',
      function (texture: Texture): void {
        material.map = texture;
      });

    // 添加轴承
    const axis = new CylinderGeometry(axisRadius, axisRadius, axisHeight,
      20, 1, false);
    axis.rotateX(Math.PI / 2);
    geometry.merge(axis);

    // 添加螺帽
    const nutR = new SphereGeometry(nutRadius, 10, 10);
    nutR.translate(0, 0, 0.3 * (axisHeight + mainLength));
    geometry.merge(nutR); // 右螺帽
    const nutL = nutR.clone();
    nutL.translate(0, 0, -0.6 * (axisHeight + mainLength));
    geometry.merge(nutL); // 左螺帽

    // 定义拉伸属性
    const extrude = {
      amount: mainLength,
      curveSegments: 30,
      bevelEnabled: false
    };

    // 添加中臂主体
    const main = new ExtrudeGeometry(this.getMainShape(mainRadius), extrude);
    main.translate(0, 0, -mainLength / 2);
    geometry.merge(main);

    // 合成物体
    this.model = new Object3D();
    this.model.add(Common.createMesh(geometry, material));
    this.model.position.set(46.33 * mainRadius, 15 * mainRadius, 0);
  }

  // 获取主体的形状
  private getMainShape(r: number): Shape {
    const hST = 0.7071 * r; // half of sqrt of two of r
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.arc(0, 0, r, Math.PI, 5 * Math.PI / 6, true);
    shape.lineTo(0, 2 * r);
    shape.lineTo(r, 3 * r);
    shape.arc(hST, -hST, r, 0.75 * Math.PI, 0.25 * Math.PI, true);
    shape.lineTo(3.4142 * r, r);
    shape.arc(-hST, -hST, r, 0.25 * Math.PI, -Math.PI / 10, true);
    shape.lineTo(r, -20 * r);
    shape.arc(-r, 0, r, 0, -Math.PI, true);
    shape.lineTo(-r, 0);
    return shape;
  }

}
