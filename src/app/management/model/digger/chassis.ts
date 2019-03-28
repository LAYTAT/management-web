/*
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：这是底盘模型模块的定义文件
 */

import {
  ExtrudeGeometry,
  Geometry,
  GeometryUtils,
  Object3D,
  Mesh,
  MeshPhongMaterial,
  CylinderGeometry,
  Shape
} from 'three';
import {Common} from './common';
import {BodyModule} from './body';
import {MainBody} from './mainbody';

// 底盘类
export class Chassis extends BodyModule {
  // 主体对象
  public mainBody: MainBody;

  // 初始化对象时设置一些初始值
  constructor() {
    super();
    this.speed = 0.008;
    this.rotates = 0;
    this.clockwise = true;
  }

  private drawTrack(halfLength: number, halfHeight: number): Shape {
    const shape = new Shape();
    shape.moveTo(-halfLength, halfHeight);
    shape.lineTo(halfLength, halfHeight);
    shape.arc(0, -halfHeight, halfHeight, Math.PI / 2, -Math.PI / 2, true);
    shape.lineTo(-halfLength, -halfHeight);
    shape.arc(0, halfHeight, halfHeight, Math.PI / 2, 3 * Math.PI / 2, false);
    return shape;
  }

  private drawConnector(halfBottomWidth: number, halfTopWidth: number, halfHeight: number): Shape {
    const shape = new Shape();
    shape.moveTo(-halfBottomWidth, 0);
    shape.lineTo(halfBottomWidth, 0);
    shape.lineTo(halfBottomWidth, halfHeight);
    shape.lineTo(halfTopWidth, 2 * halfHeight);
    shape.lineTo(-halfTopWidth, 2 * halfHeight);
    shape.lineTo(-halfBottomWidth, halfHeight);
    shape.lineTo(-halfBottomWidth, 0);
    return shape;
  }

  // 接口方法
  modeling(): void {
    const geometry = new Geometry(); // 几何形状的组合体
    const material = new MeshPhongMaterial({color: 0x383838}); // 底盘材质
    const trackWidth = 1.6; // 履带的内宽

    // 构建履带：拉伸法
    const options = {
      amount: 0.6, // 履带宽度
      bevelEnabled: false, // 禁止斜角
      curveSegments: 20 // 履带曲率
    };
    const trackGeometry = new ExtrudeGeometry(this.drawTrack(1.5, 0.3), options); // 履带半长和半高
    const trackR = Common.createMesh(trackGeometry, null, 0, 0.3, trackWidth / 2);
    GeometryUtils.merge(geometry, trackR);
    const trackL = Common.createMesh(trackGeometry, null, 0, 0.3, -trackWidth / 2 - 0.6);
    GeometryUtils.merge(geometry, trackL);

    // 构建中间件：拉伸法
    options.amount = trackWidth; // 中间件长度
    const connectorGeometry = new ExtrudeGeometry(this.drawConnector(1.2, 0.6, 0.2), options);
    const connector = Common.createMesh(connectorGeometry, null, 0, 0.2, -trackWidth / 2);
    GeometryUtils.merge(geometry, connector);

    // 构建承轴：简单几何体
    const axisGeometry = new CylinderGeometry(0.3, 0.3, 0.2, 20, 1, false);
    const axis = Common.createMesh(axisGeometry, null, 0, 0.7, 0);
    GeometryUtils.merge(geometry, axis);

    this.model = new Object3D();
    this.model.add(new Mesh(geometry, material));

    // 添加主体对象
    this.mainBody = new MainBody();
    this.mainBody.modeling();
    this.model.add(this.mainBody.model);
  }

}
