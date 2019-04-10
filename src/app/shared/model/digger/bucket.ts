/**
 * 作者：郑庆文
 * 时间：2019-03-24
 * 邮箱：quinceyzheng@126.com
 * 简介：挖斗模块的定义文件
 */

import {
  CylinderGeometry,
  ExtrudeGeometry,
  Geometry,
  MeshPhongMaterial,
  Object3D,
  PolyhedronGeometry,
  Shape,
  SphereGeometry,
  Texture,
  TextureLoader
} from 'three';
import {Common} from '../common';
import {ArmsModule} from './arms';

/* 挖斗模块类 */
export class Bucket extends ArmsModule {
  // 初始化对象时设置一些初始值
  constructor() {
    super();
    this.maxAngle = 0.5;
    this.minAngle = -1.8;
    this.speed = 0.01;
    this.rotates = 0;
    this.clockwise = true;
  }

  // 父类方法
  modeling(): void {
    // 声明常量
    const pipeWidth = 0.29; // 0.29
    const pipeAngle = Math.PI / 4;
    const pipeRadius = pipeWidth * Math.tan(pipeAngle * 0.5);
    const pipeLength = pipeWidth * 2;
    const axisRadius = pipeRadius * 0.5;
    const axisHeight = pipeLength * 1.1;
    const nutRadius = axisRadius;
    const mainUnit = pipeWidth;
    const mainLength = mainUnit * 3;
    const mainThick = mainUnit * 0.1;

    // 定义挖斗的形体和材质纹理
    const geometry = new Geometry();
    const material = new MeshPhongMaterial({shininess: 100});
    material.map = (new TextureLoader()).load('./assets/textures/gray.jpg',
      function (texture: Texture): void {
        material.map = texture;
      }); // 严格按照此格式赋予纹理

    // 定义拉伸属性
    const extrude = {
      amount: pipeLength,
      curveSegments: 30,
      bevelEnabled: false
    };

    // 添加连接管道
    const pipe = new ExtrudeGeometry(this.getPipeShape(pipeWidth, pipeAngle), extrude);
    pipe.translate(0, 0, -pipeLength * 0.5); // 物体移动对应距离
    geometry.merge(pipe);

    // 添加轴承
    const axis = new CylinderGeometry(axisRadius, axisRadius, axisHeight,
      20, 1, false);
    axis.rotateX(Math.PI * 0.5);
    geometry.merge(axis);

    // 添加螺帽
    const nutR = new SphereGeometry(nutRadius, 10, 10);
    nutR.translate(0, 0, pipeLength * 0.5);
    geometry.merge(nutR); // 右螺帽
    const nutL = nutR.clone(); // 完全克隆，包括位置等属性
    nutL.translate(0, 0, -pipeLength);
    geometry.merge(nutL); // 左螺帽

    // 添加挖斗面
    extrude.amount = mainLength;
    const main = new ExtrudeGeometry(this.getMainShape(mainUnit, mainThick), extrude);
    main.translate(0, -pipeRadius, -mainLength * 0.5);
    geometry.merge(main);

    // 添加挖斗挡板
    extrude.amount = mainThick;
    const baffleR = new ExtrudeGeometry(this.getMainShape(mainUnit), extrude);
    baffleR.translate(0, -pipeRadius, mainLength * 0.5);
    geometry.merge(baffleR);
    const baffleL = baffleR.clone();
    baffleL.translate(0, 0, -mainLength - mainThick);
    geometry.merge(baffleL);

    // 添加铲片：该形体要保证所有顶点到原点的距离相同，否则会产生形变，还有三角面的定义方向也要注意，逆时针为看得到的一面，数值大小是摆设
    const i = 1;
    const vertices = [
      4 * i, -i, 2 * i, 4 * i, -i, -2 * i,
      -4 * i, -i, -2 * i, -4 * i, -i, 2 * i,
      4 * i, i, 2 * i, 4 * i, i, -2 * i
    ];
    const indices = [
      2, 1, 0, 3, 2, 0, 0, 1, 5, 0, 5, 4,
      4, 5, 2, 4, 2, 3, 0, 4, 3, 1, 2, 5
    ];
    const shovel = new PolyhedronGeometry(vertices, indices, 4 * mainThick);
    shovel.rotateZ(0.15);
    shovel.translate(-3 * mainThick, 0.5 * mainThick - pipeRadius - 4 * mainUnit, 0);
    geometry.merge(shovel);
    for (let j = 0, u = 0.25 * mainLength - 0.5 * mainThick; j < 4; j++) {
      const s = shovel.clone();
      s.translate(0, 0, ((j % 2) ? (-0.5 - 0.5 * j) : (1 + 0.5 * j)) * u);
      geometry.merge(s);
    }

    // 合成物体
    this.model = new Object3D();
    this.model.add(Common.createMesh(geometry, material));
    this.model.position.set(0, -20 * pipeRadius, 0);
    this.model.rotateZ(-Math.PI / 2);
  }

  // 获取连接管道的形状
  private getPipeShape(W: number, a: number): Shape {
    const R = W * Math.tan(a / 2); // 计算半径
    const shape = new Shape();
    shape.moveTo(0, -R);
    shape.arc(0, R, R, 1.5 * Math.PI, 0.5 * Math.PI - a, true); // 顺时针
    shape.lineTo(W, -R);
    shape.lineTo(0, -R);
    return shape;
  }

  // 获取主体的形状：形状绘制完成后，起点和终点是会自动连接的
  private getMainShape(U: number, T?: number): Shape {
    const R = 1.274 * U;
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(U, 0);
    shape.lineTo(2.5 * U, -U);
    shape.arc(-0.71 * U, -1.06 * U, R, 0.99, -1.25, true);
    shape.lineTo(0, -4 * U);
    if (T) {
      const r = R - 0.9487 * T;
      shape.lineTo(0, T - 4 * U);
      shape.lineTo(2.196 * U - 0.3 * T, 0.9 * T - 3.268 * U);
      shape.arc(-0.3162 * r, 0.9487 * r, r, -1.25, 0.99, false);
      shape.lineTo(U, -T);
      shape.lineTo(0, -T);
      shape.lineTo(0, 0);
    } else {
      shape.lineTo(0, 0);
    }
    return shape;
  }

}
