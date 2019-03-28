/*
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：这是挖斗模型模块的定义文件
 */

import {
  CylinderGeometry,
  ExtrudeGeometry,
  Geometry,
  GeometryUtils,
  Object3D,
  Mesh,
  MeshPhongMaterial,
  Shape,
} from 'three';
import {Common} from './common';
import {ArmsModule} from './arms';

// 挖斗类
export class Bucket extends ArmsModule {
  // 初始化对象时设置一些初始值
  constructor() {
    super();
    this.maxAngle = 0.1;
    this.minAngle = -3;
    this.speed = 0.006;
    this.rotates = 0;
    this.clockwise = true;
  }

  private drawPanel(height: number, thickness: number, baffle: boolean): Shape {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(thickness, 0);
    let base;
    if (!baffle) {
      base = (height - 2 * thickness) / 5;
      shape.quadraticCurveTo(thickness + 2 * base, 4 * base, height - thickness, 0);
    }
    shape.lineTo(height, 0);
    base = height / 5;
    shape.quadraticCurveTo(2 * base, 4 * base, 0, 0);
    return shape;
  }

  // 接口方法
  modeling(): void {
    const geometry = new Geometry(); // 几何形状的组合体
    const material = new MeshPhongMaterial({color: 0x373737}); // 挖斗材质

    // 构建挖斗面
    const options = {
      amount: 0.6, // 宽度
      bevelEnabled: false, //
      curveSegments: 20 //
    };
    const panelGeometry = new ExtrudeGeometry(this.drawPanel(0.6, 0.04, false), options);
    const panel = Common.createMesh(panelGeometry, null, 0.05, -0.18, -0.3);
    GeometryUtils.merge(geometry, panel);

    // 构建挡板
    options.amount = 0.04;
    const baffleGeometry = new ExtrudeGeometry(this.drawPanel(0.6, 0.04, true), options);
    const baffleL = Common.createMesh(baffleGeometry, null, 0.05, -0.18, -0.34);
    GeometryUtils.merge(geometry, baffleL);
    const baffleR = Common.createMesh(baffleGeometry, null, 0.05, -0.18, 0.3);
    GeometryUtils.merge(geometry, baffleR);

    // 构建连接件
    const connectorGeometry = new CylinderGeometry(0.1, 0.1, 0.24, 20, 1, false);
    const connector = Common.createMesh(connectorGeometry, null, 0, 0, 0); // 3.65 1.18 0.2
    connector.rotation.x = Math.PI / 2;
    GeometryUtils.merge(geometry, connector);

    this.model = new Object3D();
    this.model.add(new Mesh(geometry, material));
    this.model.position.set(0.05, -1.82, 0);
  }

}
