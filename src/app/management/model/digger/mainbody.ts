/*
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 说明：这是主体模型模块的定义文件
 */

import {ExtrudeGeometry, Geometry, GeometryUtils, Mesh, MeshPhongMaterial, Object3D, Shape} from 'three';
import {Common} from '../common';
import {LongArm} from './longarm';
import {BodyModule} from './body';
import {Digger} from './digger';

// 主体类
export class MainBody extends BodyModule {
  // 初始化对象时设置一些初始值
  constructor() {
    super();
    this.speed = 0.008;
    this.rotates = 0;
    this.clockwise = true;
  }

  private drawPowerRoom(width: number): Shape {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(width / 4, -0.2, 3 * width / 4, -0.2, width, 0);
    shape.lineTo(width, 3);
    shape.lineTo(width - 0.4, 3);
    shape.lineTo(width - 0.4, 2);
    shape.lineTo(0, 2);
    shape.lineTo(0, 0);
    return shape;
  }

  private drawDriveRoom(height: number): Shape {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1, 0);
    shape.lineTo(1, height / 2);
    shape.lineTo(0.9, height);
    shape.lineTo(0.1, height);
    shape.lineTo(-0.1, height / 3);
    shape.lineTo(0, 0);
    return shape;
  }

  // 接口方法
  modeling(digger: Digger): void {
    const geometry = new Geometry(); // 几何形状的组合体
    const material = new MeshPhongMaterial({color: 0xbfad6f}); // 主体材质

    // 构建动力仓
    const options = {
      amount: 0.6, // 动力仓高度
      bevelEnabled: false, //
      curveSegments: 20 //
    };
    const powerRoomGeometry = new ExtrudeGeometry(this.drawPowerRoom(2), options);
    const powerRoom = Common.createMesh(powerRoomGeometry, null, -1.4, 0.8, -1);
    powerRoom.rotation.x = -Math.PI / 2;
    powerRoom.rotation.z = -Math.PI / 2;
    GeometryUtils.merge(geometry, powerRoom);

    // 构建基台

    // 构建驾驶仓
    options.amount = 0.8; // 驾驶仓宽度
    const driveRoomGeometry = new ExtrudeGeometry(this.drawDriveRoom(1.2), options);
    const driveRoom = Common.createMesh(driveRoomGeometry, null, 1.6, 0.9, -0.2);
    driveRoom.rotation.y = Math.PI;
    GeometryUtils.merge(geometry, driveRoom);

    // 构建排气孔

    this.model = new Object3D();
    this.model.add(new Mesh(geometry, material));

    // 添加长臂对象
    const longArm = new LongArm();
    longArm.modeling(digger);
    this.model.add(longArm.model);
    digger.setMainBody(this);
  }

}
