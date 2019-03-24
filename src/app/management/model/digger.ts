/*
 * 作者：郑庆文
 * 时间：2019-03-23
 * 邮箱：quinceyzheng@126.com
 * 说明：这是挖掘机模型的库文件
 */

// 导入three.js的库，没有自带的库需要额外安装
import * as THREE from 'three';
import {CylinderGeometry, ExtrudeGeometry, Geometry, Mesh, MeshPhongMaterial, Object3D, Shape} from 'three';
// 导入其他库

// 模型组件接口
interface Model {
  // 角度设置函数
  setAngle(angle: number): void;

  // 初始化建模函数
  modeling(): void;

  // 模型转动函数
  turn(radian: number): boolean;
}

// 挖掘机类
export class Digger implements Model {
  // 挖掘机模型对象
  public model: Object3D;
  // 主体对象
  private mainBody: MainBody;

  // 初始化对象
  constructor(scene: THREE.Scene) {
    this.modeling();
    scene.add(this.model);
  }

  // 获取网格对象
  static getCastShadowMesh(geometry: THREE.Geometry, material: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    return mesh;
  }

  setAngle(angle: number): void {
    if (this.model == null) {
      console.error('Digger model was undefined when setting its angle.');
    } else {
      this.model.rotation.y = angle;
    }
  }

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
    const trackR = Digger.getCastShadowMesh(trackGeometry, null, 0, 0.3, trackWidth / 2);
    THREE.GeometryUtils.merge(geometry, trackR);
    const trackL = Digger.getCastShadowMesh(trackGeometry, null, 0, 0.3, -trackWidth / 2 - 0.6);
    THREE.GeometryUtils.merge(geometry, trackL);

    // 构建中间件：拉伸法
    options.amount = trackWidth; // 中间件长度
    const connectorGeometry = new ExtrudeGeometry(this.drawConnector(1.2, 0.6, 0.2), options);
    const connector = Digger.getCastShadowMesh(connectorGeometry, null, 0, 0.2, -trackWidth / 2);
    THREE.GeometryUtils.merge(geometry, connector);

    // 构建承轴：简单几何体
    const axisGeometry = new CylinderGeometry(0.3, 0.3, 0.2, 20, 1, false);
    const axis = Digger.getCastShadowMesh(axisGeometry, null, 0, 0.7, 0);
    THREE.GeometryUtils.merge(geometry, axis);

    this.model = new Object3D();
    this.model.add(new THREE.Mesh(geometry, material));

    // 添加主体对象
    this.mainBody = new MainBody();
    this.mainBody.modeling();
    this.model.add(this.mainBody.model);
  }

  turn(radian: number): boolean {
    this.model.rotation.y += radian;
    return true;
  }

  // 自我移动函数：目前只是测试
  public moveMyself(distance: number): boolean {
    this.model.position.x += distance;
    return true;
  }

  // 主体转动函数
  public turnMainBody(radian: number): boolean {
    return this.mainBody.turn(radian);
  }

  // 长臂转动函数
  public turnLongArm(radian: number): boolean {
    return this.mainBody.longArm.turn(radian);
  }

  // 中臂转动函数
  public turnMiddleArm(radian: number): boolean {
    return this.mainBody.longArm.middleArm.turn(radian);
  }

  // 挖斗转动函数
  public turnBucket(radian: number): boolean {
    return this.mainBody.longArm.middleArm.bucket.turn(radian);
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
}

// 主体类
class MainBody implements Model {
  // 主体模型对象
  public model: Object3D;
  // 长臂对象
  public longArm: LongArm;

  // 初始化对象时设置一些常量值
  constructor() {
  }

  setAngle(angle: number): void {
    if (this.model == null) {
      console.error('MainBody model was undefined when setting its angle.');
    } else {
      this.model.rotation.y = angle;
    }
  }

  modeling(): void {
    const geometry = new Geometry(); // 几何形状的组合体
    const material = new MeshPhongMaterial({color: 0xbfad6f}); // 主体材质
    material.side = THREE.DoubleSide;

    // 构建动力仓
    const options = {
      amount: 0.6, // 动力仓高度
      bevelEnabled: false, //
      curveSegments: 20 //
    };
    const powerRoomGeometry = new ExtrudeGeometry(this.drawPowerRoom(2), options);
    const powerRoom = Digger.getCastShadowMesh(powerRoomGeometry, null, -1.4, 0.8, -1);
    powerRoom.rotation.x = -Math.PI / 2;
    powerRoom.rotation.z = -Math.PI / 2;
    THREE.GeometryUtils.merge(geometry, powerRoom);
    /*
        // 构建基台
        const stageGeometry = new CubeGeometry(1, 0.1, 2);
        const stage = Digger.getCastShadowMesh(stageGeometry, null, 1.1, 0.85, 0);
        THREE.GeometryUtils.merge(geometry, stage);
    */
    // 构建驾驶仓
    options.amount = 0.8; // 驾驶仓宽度
    const driveRoomGeometry = new ExtrudeGeometry(this.drawDriveRoom(1.2), options);
    const driveRoom = Digger.getCastShadowMesh(driveRoomGeometry, null, 1.6, 0.9, -0.2);
    driveRoom.rotation.y = Math.PI;
    THREE.GeometryUtils.merge(geometry, driveRoom);
    /*
        // 构建排气孔
        const exhaustGeometry = new CubeGeometry(0.8, 0.1, 1.5);
        const exhaust = Digger.getCastShadowMesh(exhaustGeometry, null, -0.5, 1.45, 0);
        THREE.GeometryUtils.merge(geometry, exhaust);
        const points = [
          new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.1, 0),
          new THREE.Vector3(0, 0.2, 0), new THREE.Vector3(0.1, 0.25, 0)
        ];
        const pipeGeometry = new THREE.TubeGeometry(new SplineCurve3(points), 64, 0.06, 10, false);
        const pipe = Digger.getCastShadowMesh(pipeGeometry, null, -0.7, 1.5, 0.4);
        pipe.rotation.y = Math.PI;
        THREE.GeometryUtils.merge(geometry, pipe);*/

    this.model = new Object3D();
    this.model.add(new Mesh(geometry, material));

    // 添加长臂对象
    this.longArm = new LongArm();
    this.longArm.modeling();
    this.model.add(this.longArm.model);
  }

  turn(radian: number): boolean {
    this.model.rotation.y += radian;
    return true;
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
}

// 长臂类
class LongArm implements Model {
  // 长臂模型对象
  public model: Object3D;
  // 中臂对象
  public middleArm: MiddleArm;
  // 最大绝对活动角度
  private readonly maxAngle: number;
  // 最小绝对活动角度
  private readonly minAngle: number;

  // 初始化对象时设置一些常量值
  constructor() {
    this.maxAngle = 0.4;
    this.minAngle = -0.2;
  }

  setAngle(angle: number): void {
    if (this.model == null) {
      console.error('LongArm model was undefined when setting its angle.');
    } else if (angle > this.maxAngle || angle < this.minAngle) {
      console.error('The angle was not between ' + this.minAngle +
        ' and ' + this.maxAngle + ' when setting it.');
    } else {
      this.model.rotation.z = angle;
    }
  }

  modeling(): void {
    const geometry = new Geometry(); // 几何形状的组合体
    const material = new MeshPhongMaterial({color: 0xffd700}); // 长臂材质

    // 构建主体部分
    const options = {
      amount: 0.4, // 宽度
      bevelEnabled: false, //
      curveSegments: 20 //
    };
    const mainPartGeometry = new ExtrudeGeometry(this.drawMainPart(3, 2, 0.3, 0.1), options);
    const mainPart = Digger.getCastShadowMesh(mainPartGeometry, null, -0.3, 0.1, -0.2);
    THREE.GeometryUtils.merge(geometry, mainPart);

    // 构建连接件
    const connectorGeometry = new CylinderGeometry(0.1, 0.1, 1, 20, 1, false);
    const connector = Digger.getCastShadowMesh(connectorGeometry, null, 0, 0, 0); // 1 1 0.2
    connector.rotation.x = Math.PI / 2;
    THREE.GeometryUtils.merge(geometry, connector);

    this.model = new Object3D();
    this.model.add(new Mesh(geometry, material));

    // 添加中臂对象
    this.middleArm = new MiddleArm();
    this.middleArm.modeling();
    this.model.add(this.middleArm.model);
    this.model.position.set(1, 1, 0.2);
  }

  turn(radian: number): boolean {
    this.model.rotation.z += radian; // 暂时旋转
    const remainder = this.model.rotation.z % (2 * Math.PI); // 求余数
    if (remainder > this.maxAngle || remainder < this.minAngle) { // 判断角度
      this.model.rotation.z -= radian; // 恢复角度
      return false;
    }
    return true;
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
}

// 中臂类
class MiddleArm implements Model {
  // 中臂模型对象
  public model: Object3D;
  // 挖斗对象
  public bucket: Bucket;
  // 最大绝对活动角度
  private readonly maxAngle: number;
  // 最小绝对活动角度
  private readonly minAngle: number;

  // 初始化对象时设置一些常量值
  constructor() {
    this.maxAngle = 1;
    this.minAngle = -0.1;
  }

  setAngle(angle: number): void {
    if (this.model == null) {
      console.error('MiddleArm model was undefined when setting its angle.');
    } else if (angle > this.maxAngle || angle < this.minAngle) {
      console.error('The angle was not between ' + this.minAngle +
        ' and ' + this.maxAngle + ' when setting it.');
    } else {
      this.model.rotation.z = angle;
    }
  }

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
    const mainPart = Digger.getCastShadowMesh(mainPartGeometry, null, -0.1, -1.8, -0.1);
    THREE.GeometryUtils.merge(geometry, mainPart);

    // 构建连接件
    const connectorGeometry = new CylinderGeometry(0.04, 0.04, 0.44, 20, 1, false);
    const connector = Digger.getCastShadowMesh(connectorGeometry, null, 0, 0, 0); // 3.6 3 0.2
    connector.rotation.x = Math.PI / 2;
    THREE.GeometryUtils.merge(geometry, connector);

    this.model = new Object3D();
    this.model.add(new Mesh(geometry, material));

    // 添加挖斗对象
    this.bucket = new Bucket();
    this.bucket.modeling();
    this.model.add(this.bucket.model);
    this.model.position.set(2.6, 2, 0);
  }

  turn(radian: number): boolean {
    this.model.rotation.z += radian; // 暂时旋转
    const remainder = this.model.rotation.z % (2 * Math.PI); // 求余数
    if (remainder > this.maxAngle || remainder < this.minAngle) { // 判断角度
      this.model.rotation.z -= radian; // 恢复角度
      return false;
    }
    return true;
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
}

// 挖斗类
class Bucket implements Model {
  // 挖斗模型对象
  public model: Mesh;
  // 最大绝对活动角度
  private readonly maxAngle: number;
  // 最小绝对活动角度
  private readonly minAngle: number;

  // 初始化对象时设置一些常量值
  constructor() {
    this.maxAngle = 0.1;
    this.minAngle = -3;
  }

  setAngle(angle: number): void {
    if (this.model == null) {
      console.error('Bucket model was undefined when setting its angle.');
    } else if (angle > this.maxAngle || angle < this.minAngle) {
      console.error('The angle was not between ' + this.minAngle +
        ' and ' + this.maxAngle + ' when setting it.');
    } else {
      this.model.rotation.z = angle;
    }
  }

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
    const panel = Digger.getCastShadowMesh(panelGeometry, null, 0.05, -0.18, -0.3);
    THREE.GeometryUtils.merge(geometry, panel);

    // 构建挡板
    options.amount = 0.04;
    const baffleGeometry = new ExtrudeGeometry(this.drawPanel(0.6, 0.04, true), options);
    const baffleL = Digger.getCastShadowMesh(baffleGeometry, null, 0.05, -0.18, -0.34);
    THREE.GeometryUtils.merge(geometry, baffleL);
    const baffleR = Digger.getCastShadowMesh(baffleGeometry, null, 0.05, -0.18, 0.3);
    THREE.GeometryUtils.merge(geometry, baffleR);

    // 构建连接件
    const connectorGeometry = new CylinderGeometry(0.1, 0.1, 0.24, 20, 1, false);
    const connector = Digger.getCastShadowMesh(connectorGeometry, null, 0, 0, 0); // 3.65 1.18 0.2
    connector.rotation.x = Math.PI / 2;
    THREE.GeometryUtils.merge(geometry, connector);

    this.model = new Mesh(geometry, material);
    this.model.position.set(0.05, -1.82, 0);
  }

  turn(radian: number): boolean {
    this.model.rotation.z += radian; // 暂时旋转
    const remainder = this.model.rotation.z % (2 * Math.PI); // 求余数
    if (remainder > this.maxAngle || remainder < this.minAngle) { // 判断角度
      this.model.rotation.z -= radian; // 恢复角度
      return false;
    }
    return true;
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
}
