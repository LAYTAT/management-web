/*
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：这是长臂模型模块的定义文件
 */

import {CylinderGeometry, ExtrudeGeometry, Geometry, GeometryUtils, Mesh, MeshPhongMaterial, Object3D, Shape} from 'three';
import {Common} from '../common';
import {ArmsModule} from './arms';
import {MiddleArm} from './middlearm';
import {Digger} from './digger';

// 长臂类
export class LongArm extends ArmsModule {
  // 初始化对象时设置一些初始值
  constructor() {
    super();
    this.maxAngle = 0.4;
    this.minAngle = -0.2;
    this.speed = 0.006;
    this.rotates = 0;
    this.clockwise = true;
  }

  private drawMainPart(length: number, height: number, bottomRadius: number, topRadius: number): Shape {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.arc(bottomRadius, 0, bottomRadius, Math.PI, Math.PI * 2, true);
    shape.bezierCurveTo(2 * bottomRadius, height / 2 - topRadius, length / 2 + bottomRadius,
      height - 2 * topRadius, length, height - 2 * topRadius);
    shape.arc(0, topRadius, topRadius, -Math.PI / 2, Math.PI / 2, true);
    shape.bezierCurveTo(length / 2, height, 0, height / 2, 0, 0);
    return shape;
  }

  modeling(digger: Digger): void {
    const geometry = new Geometry(); // 几何形状的组合体
    const material = new MeshPhongMaterial({color: 0xffd700}); // 长臂材质

    // 构建主体部分
    const options = {
      amount: 0.4, // 宽度
      bevelEnabled: false, //
      curveSegments: 20 //
    };
    const mainPartGeometry = new ExtrudeGeometry(this.drawMainPart(3, 2, 0.3, 0.1), options);
    const mainPart = Common.createMesh(mainPartGeometry, null, -0.3, 0.1, -0.2);
    GeometryUtils.merge(geometry, mainPart);

    // 构建连接件
    const connectorGeometry = new CylinderGeometry(0.1, 0.1, 1, 20, 1, false);
    const connector = Common.createMesh(connectorGeometry, null, 0, 0, 0); // 1 1 0.2
    connector.rotation.x = Math.PI / 2;
    GeometryUtils.merge(geometry, connector);

    this.model = new Object3D();
    this.model.add(new Mesh(geometry, material));

    // 添加中臂对象
    const middleArm = new MiddleArm();
    middleArm.modeling(digger);
    this.model.add(middleArm.model);
    this.model.position.set(1, 1, 0.2);
    digger.setLongArm(this);
  }

}
