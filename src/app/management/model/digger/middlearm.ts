/*
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：这是中臂模型模块的定义文件
 */

import {
  CylinderGeometry,
  ExtrudeGeometry,
  Geometry,
  GeometryUtils,
  Object3D,
  Mesh,
  MeshPhongMaterial,
  Shape
} from 'three';
import {Common} from './common';
import {Bucket} from './bucket';
import {ArmsModule} from './arms';

// 中臂类
export class MiddleArm extends ArmsModule {
  // 挖斗对象
  public bucket: Bucket;

  // 初始化对象时设置一些初始值
  constructor() {
    super();
    this.maxAngle = 1;
    this.minAngle = -0.1;
    this.speed = 0.003;
    this.rotates = 0;
    this.clockwise = true;
  }

  private drawMainPart(length: number, bulge: number, topRadius: number, bottomRadius: number): Shape {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, length);
    shape.lineTo(2 * bulge / 3, length + bulge);
    shape.arc(topRadius, 0, topRadius, Math.PI, 0, true);
    shape.lineTo(2 * bottomRadius, 0);
    shape.arc(-bottomRadius, 0, bottomRadius, Math.PI, 2 * Math.PI, false);
    return shape;
  }

  // 接口方法
  modeling(): void {
    const geometry = new Geometry(); // 几何形状的组合体
    const material = new MeshPhongMaterial({color: 0xcfbc58}); // 短臂材质

    // 构建主体部分
    const options = {
      amount: 0.2, // 宽度
      bevelEnabled: false, //
      curveSegments: 20 //
    };
    const mainPartGeometry = new ExtrudeGeometry(this.drawMainPart(1.8, 0.6, 0.1, 0.15), options);
    const mainPart = Common.createMesh(mainPartGeometry, null, -0.1, -1.8, -0.1);
    GeometryUtils.merge(geometry, mainPart);

    // 构建连接件
    const connectorGeometry = new CylinderGeometry(0.04, 0.04, 0.44, 20, 1, false);
    const connector = Common.createMesh(connectorGeometry, null, 0, 0, 0); // 3.6 3 0.2
    connector.rotation.x = Math.PI / 2;
    GeometryUtils.merge(geometry, connector);

    this.model = new Object3D();
    this.model.add(new Mesh(geometry, material));

    // 添加挖斗对象
    this.bucket = new Bucket();
    this.bucket.modeling();
    this.model.add(this.bucket.model);
    this.model.position.set(2.6, 2, 0);
  }

}
